# syntax=docker/dockerfile:1.3

# Stage 1: Base image with essential dependencies
FROM node:20.12-alpine3.18 AS base

# Install required dependencies, including libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

# Set npm registry to a faster mirror (optional, based on your location)
RUN npm config set registry https://registry.npmjs.org/

# Stage 2: Builder stage for building the Next.js app
FROM base as builder

# Set working directory for the builder stage
WORKDIR /app_build

# Copy package.json and package-lock.json separately to utilize Docker cache
COPY package*.json ./

# Install npm dependencies using Docker BuildKit cache mount
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 3: Production stage for running the Next.js app
FROM base as production

# Set working directory for the production stage
WORKDIR /app_run

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a system group 'nodejs' with GID 1001
RUN addgroup -g 1001 -S nodejs

# Create a system user 'nextjs' with UID 1001
RUN adduser -S nextjs -u 1001

# Set the user to 'nextjs' for running the app
USER nextjs

# Copy built files and directories from the builder stage to the production stage
COPY --from=builder --chown=nextjs:nodejs /app_build/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app_build/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app_build/public ./public

# Define a health check to verify the server's health
# This checks if the sign_in page responds successfully within a certain timeframe
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD wget -qO- http://localhost:3000/sign_in || exit 1

# Command to start the Next.js app in standalone mode
USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
#CMD ["node", "server.js"]
CMD ["npm", "run", "start-standalone"]