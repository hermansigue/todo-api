# Gunakan Node.js 18 sebagai image dasar
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Expose port aplikasi kamu (sesuaikan dengan port yang digunakan aplikasi)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi kamu
CMD ["npm", "start"]
