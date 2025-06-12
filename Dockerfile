# Builder stage
FROM node:18 AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies dan generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy seluruh proyek dan build
COPY . .
RUN npm run build  # Pastikan ini menghasilkan folder .next dan public (jika ada)

# Production stage
FROM node:18 AS production
WORKDIR /app
ENV NODE_ENV production

# Salin hanya yang diperlukan
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Expose port dan jalankan aplikasi
EXPOSE 3000
CMD ["npm", "start"]