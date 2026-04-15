# ================================
# BRASA — Pizzeria Artisanale
# Static site served by nginx
# ================================

FROM nginx:1.27-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy site files
COPY index.html  /usr/share/nginx/html/
COPY css/        /usr/share/nginx/html/css/
COPY js/         /usr/share/nginx/html/js/
COPY robots.txt  /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/

# Custom nginx config for clean URLs and performance
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1
