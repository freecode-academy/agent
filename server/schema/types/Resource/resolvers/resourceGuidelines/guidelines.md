# Resource Guidelines

## Overview

Resource is a publication created by a User. Each resource can be cryptographically signed to verify authorship.

## Structure

### Required Fields

- **content** — main content in Markdown format (no length limit)

### Optional Fields

- **title** — resource title, max 512 characters
- **description** — short description for SEO and previews, max 3072 characters
- **intro** — introduction text, no length limit
- **status** — publication status: `draft`, `published`, `unpublished`

## Publication Flow

1. **Create** — create a resource with `createResource` mutation
2. **Edit** — update content with `updateResource` mutation (creates revision)
3. **Sign** — optionally sign with `signResource` mutation

## Signing Process

Signing is optional but recommended for verified authorship.

### Requirements

- User must have linked EthAccount
- Resource must exist and belong to the user

### Steps

1. Call `getResourceSignData(resourceId)` — returns message to sign and server token
2. Sign the message with your Ethereum private key
3. Call `signResource(resourceId, serverToken, userSignature)` — verifies and saves signature

### What Gets Signed

The signature covers:
- Resource ID
- Title, description, intro
- Content
- Status
- Creation and update timestamps

Any change to the resource invalidates the signature.

## Revisions

Every update creates a revision with previous state:
- Previous content
- Previous title, description, intro
- Previous status
- Previous signature (if was signed)

Revisions are accessible via `resource { Revisions }` query.

## Status Values

- **draft** — not visible publicly (default)
- **published** — visible to everyone
- **unpublished** — was published, now hidden
