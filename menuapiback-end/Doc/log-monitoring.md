# Log and System Monitoring Module

This module provides logging and monitoring functionalities using both Sentry and Winston. It includes two submodules: sentry and winston, each offering similar features for logging and monitoring.

#### Module Overview

---

## Table of Contents

- [Module Goal](#Module-goal)
- [Module structure](#module-structure)
- [Sentry](#sentry)
- [Winston](#winston)
- [References](#references)

# Module Goal

The goal of this module is to provide logging and monitoring functionalities using both Sentry and Winston. It includes two submodules, sentry and winston, each offering similar features for logging and monitoring

# Module-structure

```
log-monitoring/
│
├── sentry/
│ ├── sentry.module.ts
│ ├── sentry-logger.service.ts
│ └── sentry.controller.ts
│
├── winston/
│ ├── winston.module.ts
│ ├── winston-logger.service.ts
│ ├── winston-monitoring.service.ts
│ └── winston.controller.ts
│
└─ log-monitoring.module.ts
```

# Sentry

## Installation

```sh
npm install --save @sentry/nestjs @sentry/profiling-node

```

## Setup

1. Go to https://sentry.io/welcome/

2. Create an account and create a project

3. Get the `dsn` string and put it on .env file and name it `DSN`

4. Create the instrument.ts file and past the code provided by sentry:

   ```javascript
   import * as Sentry from '@sentry/node'
   import { nodeProfilingIntegration } from '@sentry/profiling-node'
   Sentry.init({
     dsn: process.env.DSN,
     integrations: [nodeProfilingIntegration()],
     // Performance Monitoring
     tracesSampleRate: 1.0, // Capture 100% of the transactions
     // Set sampling rate for profiling - this is relative to tracesSampleRate
     profilesSampleRate: 1.0,
   })
   ```

5. Go to sentry > settings > Developer Settings > Custom Integrations

6. Create an Integration by filling the necessary input fields and configure permissions

7. Generate token and put it on .env file named `SENTRY_TOKEN`

8. put the sentry url on the .env file names as `SENTRY_API_URL`:

   the format is `SENTRY_API_URL=https://sentry.io/api/0/projects/username//`

## Usage

Sentry tracks errors once the setup is done correctly ,in sentry `events` are things that are happing in the app as example `errors` are events.
Issues are grouped events.

The Sentry submodule service has two methods

```javascript
getIssues // returns all the errors that sentry has tracked.

getEvents //returns all the events that sentry has tracked.
```

## Endpoints

Replace `http://localhost:3000/` this with your host for testing

To retrieve all the events from sentry:

- http://localhost:3000/sentry/events

To retrieve a single error/issues from sentry:

- http://localhost:3000/sentry/issues

# Winston

This submodule provides two services:

1. logging service:

   - in this service winston is used to initialize a logger that saves daily error logs to local file called logs.
     The file format is `json`

```javascript
  this.logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
  ),
  transports: [fileTransport, consoleTransport],
 })
 }
```

- This service also overrides console.log and provides instance of winston logger.
  This service can be injected anywhere and be used

```javascript
 log(message: string) {
    this.logger.info(message)
  }

  error(message: string, metadata?: Record<string, any>) {
    if (metadata) {
      this.logger.error(message, metadata)
    } else {
      this.logger.error(message)
    }
  }
```

2. monitoring service
   This service provides two main methods:

   ```javascript
   getIssues() //read the logs of the current day and return them as json

   getIssue(id:string) // returns a singe error from the  current day log given an id

   getAnalytics() // returns basic info about the errors like ,number of errors that happened in the current day and the frequency of the error types
   ```

## Installation

```sh
npm i winston

```

## Setup

Import winston , create a logger by using the `winston.createLogger` method and pass the required files like

- levels
- transports
- format

## Usage

The logger service usage example

```javascript
import { Controller, Get, NotFoundException } from '@nestjs/common'
import AppService from './app.service'
import { WinstonLoggerService } from './log-monitoring/winston/winston-logger.service'

@Controller()
export default class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: WinstonLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.warn('This is a warning')
    return this.appService.getHello()
  }
}

```

## Endpoints

Replace `http://localhost:3000/` this with your host for testing

To retrieve all the errors of the current day from lo file:

- http://localhost:3000/winston/issues

To retrieve a single error from the current day log file:

- http://localhost:3000/winston/some-id

To get Basic analytics:

- http://localhost:3000/winston/analytics
