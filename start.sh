#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p /app/data
chmod 755 /app/data

# Start the application
exec elizaos start