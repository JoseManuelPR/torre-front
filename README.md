# Torre Front

## Installation

You can use Docker with Dockerfile to create a image of this project or using this DockerCompose creating the file outside of both directories and it's going to install all for you in containers exposing ports in you local.

```bash
version: '3'

services: 
  api-torre:
    stdin_open: true
    restart: unless-stopped
    container_name: api-torre
    build: ./torre-api
    tty: true
    ports:
      - 5023:5000
    volumes:
      - ./torre-api:/var/api-torre

  front-torre:
    stdin_open: true
    restart: unless-stopped
    container_name: front-torre
    build: ./torre-front
    ports:
      - 3023:3000
    links:
      - api-torre
    depends_on:
      - api-torre
    volumes:
      - ./torre-front:/var/front-torre
```

## Usage
### Landing
```bash
http://localhost:3023/
```

### Opportunities
```bash
http://localhost:3023/dashboard/opportunities
```

### People
```bash
http://localhost:3023/dashboard/bios
```

### My Genome
```bash
http://localhost:3023/dashboard/me
```

### Specific Genome
```bash
http://localhost:3023/dashboard/bios/:username
```