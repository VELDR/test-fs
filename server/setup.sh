#!/bin/bash
cp ./.env.example ./.env
npm install
npm run seed
npm run dev