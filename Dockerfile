FROM python:3.10-slim

WORKDIR /app

# Copy application files
COPY . /app

# Expose HTTP port
EXPOSE 8080

ENV PORT=8080

# Launch main.py entrypoint
CMD ["python", "main.py"]
