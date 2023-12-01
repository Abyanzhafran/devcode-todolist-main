# Devcode todolist

This is a nodejs application packaged using docker to pass devcode coding challenge automation testing

## Prequisite

Built with :

- Node v18 (Express js)
- MySql RDBMS
- Docker

## Setup for local development

### Install the Dependencies

```bash
npm install
```

### Start the app in development mode

```bash
npm start
```

## Run the application using docker image
Running a Docker container from a Docker Hub repository is a straightforward process. Here are the general steps:

1. Open [Docker hub](https://hub.docker.com/)

2. search the docker image "aliasjupleks / devcode-todolist-main-app"

3. **Pull the Image :**

   ```bash
   docker pull <image_name>
   ```

   Replace `<image_name>` with the actual name of the image you want to pull.

4. **Run the Container :**

   ```bash
   docker run <options> <image_name>
   ```

   Replace `<options>` with any additional options you want to pass (e.g., ports, volumes), and `<image_name>` with the name of the image.

   Here's a simple example:

   ```bash
   docker run -d -p 3030:3030 --name my_container <image_name>
   ```

   - `-d`: Run the container in the background (detached mode).
   - `-p 8080:80`: Map port 8080 on the host to port 80 on the container.
   - `--name my_container`: Assign a name to the container.

5. **Verify the Container is Running :**
   You can check the running containers using:

   ```bash
   docker ps
   ```

   This command will show you a list of running containers along with their details.