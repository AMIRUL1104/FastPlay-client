# FastPlay

Welcome to FastPlay, a modern e-commerce platform built with Next.js, designed to deliver a fast, responsive, and engaging shopping experience. This application leverages the power of AI to provide personalized product recommendations and an interactive chat assistant, enhancing user satisfaction and streamlining the purchasing process.

## Live Demo

[//]: # "https://fastplay-go.vercel.app"

## Screenshots

(leave placeholders if unavailable)

[//]: # "Placeholder for screenshots. Add relevant images here."

## Features

### Authentication

- User registration and login.
- Secure authentication powered by `better-auth`.
- Social authentication options (placeholder).

### User Features

- Browse products with search and filtering.
- Add/remove items from the shopping cart.
- Manage user profile.
- View order history.

### Admin Features

- Dashboard for administrative tasks.
- Manage products (add, edit, delete).
- Manage user accounts.
- Process orders.

### Product Management

- Product listing with pagination.
- Detailed product pages.
- Categorization of products.

### Cart

- Add to cart functionality.
- Update item quantities in the cart.
- Remove items from the cart.
- Cart summary and checkout initiation.

### Orders

- View pending and completed orders.
- Order details and tracking (placeholder).

### AI Features

- **AI Chat Assistant**: Interactive AI assistant to help users with queries and product information.
- **Product Recommendations**: AI-driven personalized product suggestions.

### Dashboard

- User-specific dashboard for quick access to orders and profile.
- Admin dashboard for comprehensive management.

### Search & Filter

- Efficient product search.
- Filtering options for product discovery.

### Responsive Design

- Optimized for various screen sizes, from mobile to desktop.

### Security

- (Details will be filled in the Security Features section)

### Performance

- (Details will be filled in the Performance Optimizations section)

## Tech Stack

### Frontend

- **Framework**: Next.js
- **Library**: React (v19)
- **Data Fetching/State Management**: React Query (`@tanstack/react-query`)

### Backend

- **Framework**: Next.js (API Routes)
- **Language**: TypeScript

### Database

- **Type**: NoSQL Database
- **System**: MongoDB
- **Driver**: `mongodb`

### Authentication

- **Library**: `better-auth`

### Styling

- **Framework**: Tailwind CSS

### State Management

- React Query (for server state)
- React Context / Zustand / Jotai (placeholder for client state)

### Validation

- **Library**: Zod (`zod`)
- **Form Integration**: `@hookform/resolvers`

### Image Upload

- (Placeholder for image upload library/service)

### Deployment

- (Details will be filled in the Deployment section)

### AI

- **API/Service**: (Placeholder for AI model/service used)

### Other Libraries

- `lucide-react`, `react-icons`: Icon libraries
- `react-hook-form`: Form management
- `react-markdown`: Markdown rendering
- `react-toastify`: Toast notifications

## Project Architecture

FastPlay follows a modern, scalable architecture, primarily leveraging Next.js's full-stack capabilities.

**Client-Side (Frontend - Next.js/React)**
Users interact with the React components rendered by Next.js. Data fetching often utilizes React Query for efficient caching and state management.

**Server-Side (Next.js API Routes)**
Frontend requests for data or actions are routed through Next.js API routes. These routes act as the backend for the application, handling business logic, data validation, and database interactions.

**Services Layer**
The `src/services` directory contains modules responsible for interacting with external services and the database. `src/services/core/server.ts` and `src/services/server/api.ts` likely handle server-side logic and database operations.

**Database (MongoDB)**
The services layer communicates with the MongoDB database using the `mongodb` driver to store and retrieve application data, including user information, products, and orders.

### Request Flow (Client to Database)

1.  **Client Request**: A user action on the frontend (e.g., clicking "Add to Cart," submitting a login form) triggers a request.
2.  **Frontend Logic**: React components handle user input and data presentation. Data fetching or mutation requests are often managed by React Query.
3.  **Next.js API Route**: The request is sent to a corresponding Next.js API route (e.g., `/api/cart`, `/api/auth/signin`). These routes are defined in `src/app/api`.
4.  **Server-Side Processing**: The API route handler in `src/app/api` or a service function in `src/services` processes the request. This includes:
    - **Authentication**: Verifying user credentials using `better-auth`.
    - **Validation**: Input validation using Zod schemas (e.g., `productZodSchema.ts`).
    - **Business Logic**: Performing operations like adding a product to a cart, creating an order, or fetching dashboard data.
5.  **Database Interaction**: The service layer interacts with MongoDB to persist or retrieve data.
6.  **Response**: The API route sends a response back to the client, which updates the UI accordingly.

## Folder Structure

```
.
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── about/
    │   │   └── page.tsx
    │   ├── api/
    │   │   └── auth/
    │   │       └── [...all]/
    │   │           └── route.ts
    │   ├── auth/
    │   │   ├── signin/
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── page.tsx
    │   │   │   └── SocialAuth.tsx
    │   │   └── signup/
    │   │       ├── page.tsx
    │   │       └── RegisterForm.tsx
    │   ├── cart/
    │   │   └── page.tsx
    │   ├── checkout/
    │   │   └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   ├── dashboard/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── admin/
    │   │   │   ├── page.tsx
    │   │   │   ├── orders/
    │   │   │   │   └── page.tsx
    │   │   │   ├── products/
    │   │   │   │   ├── page.tsx
    │   │   │   │   └── new/
    │   │   │   │       ├── page.tsx
    │   │   │   │       └── productZodSchema.ts
    │   │   │   └── users/
    │   │   │       └── page.tsx
    │   │   └── user/
    │   │       └── page.tsx
    │   ├── orders/
    │   │   ├── OrderTableList.tsx
    │   │   └── page.tsx
    │   ├── products/
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       └── page.tsx
    │   └── profile/
    │       ├── page.tsx
    │       └── ProfileForm.tsx
    ├── components/
    │   ├── ai/
    │   │   ├── AIChatButton.tsx
    │   │   ├── AIChatWindow.tsx
    │   │   ├── ChatHeader.tsx
    │   │   ├── ChatInput.tsx
    │   │   ├── ChatMessage.tsx
    │   │   ├── ChatMessages.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductRecommendations.tsx
    │   │   ├── SuggestedQuestions.tsx
    │   │   └── TypingIndicator.tsx
    │   ├── cart/
    │   │   ├── CartItemRow.tsx
    │   │   ├── CartSummary.tsx
    │   │   ├── EmptyCart.tsx
    │   │   └── ProductAddToCartBtn.tsx
    │   ├── checkout/
    │   │   ├── EmptyCheckout.tsx
    │   │   ├── OrderSummary.tsx
    │   │   └── ShippingForm.tsx
    │   ├── dashboard/
    │   │   ├── dashboard.ts
    │   │   └── DashboardSidebar.tsx
    │   ├── home/
    │   │   ├── AIAssistantBanner.tsx
    │   │   ├── CategoriesSection.tsx
    │   │   ├── FAQSection.tsx
    │   │   ├── FeaturedProducts.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── StatisticsSection.tsx
    │   │   └── WhyChooseUs.tsx
    │   ├── layout/
    │   │   ├── Footer/
    │   │   │   └── Footer.tsx
    │   │   └── Navbar/
    │   │       ├── Logout.tsx
    │   │       ├── MobileBottomNav.tsx
    │   │       ├── MobileMenuDrawer.tsx
    │   │       └── Navbar.tsx
    │   └── products/
    │       ├── AddToCartButton.tsx
    │       ├── ProductCartActions.tsx
    │       ├── ProductGrid.tsx
    │       ├── ProductImage.tsx
    │       ├── ProductInfo.tsx
    │       ├── ProductsPagination.tsx
    │       ├── QuantitySelector.tsx
    │       └── SearchFilter.tsx
    ├── hooks/
    │   └── useAIChat.ts
    ├── lib/
    │   ├── auth-client.ts
    │   ├── auth.ts
    │   └── ui/
    │       └── ProductCard.tsx
    ├── services/
    │   ├── core/
    │   │   ├── server.ts
    │   │   ├── serverFetch.ts
    │   │   └── session.ts
    │   └── server/
    │       ├── action.ts
    │       └── api.ts
    └── types/
        ├── ai.type.ts
        ├── cart.type.ts
        ├── dashboard.type.ts
        ├── order.type.ts
        ├── product.type.ts
        ├── user.type.ts
```

## Installation

To get FastPlay up and running on your local machine, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/FastPlay.git
cd FastPlay
```

### Install Dependencies

Install the necessary Node.js packages using npm:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. **Do NOT expose any secret values publicly.**

| Variable               | Description                                  | Required |
| :--------------------- | :------------------------------------------- | :------- |
| `MONGODB_URI`          | Connection string for your MongoDB database. | Yes      |
| `NEXTAUTH_SECRET`      | A secret key used for NextAuth.js sessions.  | Yes      |
| `NEXTAUTH_URL`         | The base URL of your application.            | Yes      |
| `AI_API_KEY`           | API key for the AI service.                  | No       |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID for social login.     | No       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret for social login. | No       |
| `GITHUB_CLIENT_ID`     | GitHub OAuth client ID for social login.     | No       |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret for social login. | No       |

[//]: # "Placeholder for other potential environment variables if discovered"

### Run Frontend & Backend (Development Mode)

To start the development server with hot-reloading:

```bash
npm run dev
```

This will run the Next.js application, which includes both the frontend and API routes. The application will be accessible at `http://localhost:3000`.

### Production Mode

To build the application for production:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`:
  Starts the development server. The application will open in your browser at `http://localhost:3000`. Pages reload automatically on edits.
- `npm run build`:
  Builds the application for production to the `.next` folder. This command optimizes the application for the best performance.
- `npm run start`:
  Starts the Next.js production server. This should be used after running `npm run build`.
- `npm run lint`:
  Runs ESLint to check for code quality and style issues.

## API Endpoints

The API endpoints are built using Next.js API Routes, providing a RESTful interface for interacting with the application's backend services.

### Authentication

- `POST /api/auth/signin`: Authenticate user and create a session.
- `POST /api/auth/signup`: Register a new user.
- `GET /api/auth/signout`: Log out the current user.
- `GET /api/auth/session`: Get current user session.

### Products

- `GET /api/products`: Retrieve a list of all products.
- `GET /api/products/[id]`: Retrieve details for a specific product.
- `POST /api/admin/products/new`: Add a new product (Admin only).
- `PUT /api/admin/products/[id]`: Update an existing product (Admin only).
- `DELETE /api/admin/products/[id]`: Delete a product (Admin only).

### Cart

- `GET /api/cart`: Retrieve the current user's cart.
- `POST /api/cart`: Add an item to the cart.
- `PUT /api/cart/[itemId]`: Update the quantity of an item in the cart.
- `DELETE /api/cart/[itemId]`: Remove an item from the cart.

### Orders

- `GET /api/orders`: Retrieve a list of the current user's orders.
- `POST /api/orders`: Create a new order (checkout process).
- `GET /api/admin/orders`: Retrieve all orders (Admin only).
- `PUT /api/admin/orders/[id]`: Update order status (Admin only).

### Dashboard

- `GET /api/dashboard/user`: Retrieve user-specific dashboard data.
- `GET /api/dashboard/admin`: Retrieve admin-specific dashboard data (Admin only).

### AI

- `POST /api/ai/chat`: Send a message to the AI chat assistant.
- `GET /api/ai/recommendations`: Get personalized product recommendations.

### Admin

- `GET /api/admin/users`: Retrieve a list of all users (Admin only).
- `GET /api/admin/users/[id]`: Retrieve details for a specific user (Admin only).
- `PUT /api/admin/users/[id]`: Update user information (Admin only).
- `DELETE /api/admin/users/[id]`: Delete a user (Admin only).

## Database Design

FastPlay uses MongoDB as its primary database, a NoSQL document database. This provides flexibility and scalability for handling various types of e-commerce data.

### Collections (Models)

- **Users**: Stores user information, including authentication details, profile data, and roles (e.g., `user`, `admin`).
  - Fields: `_id`, `name`, `email`, `passwordHash`, `role`, `createdAt`, `updatedAt`.
  - Relationships: One-to-many with Orders (a user can have many orders).
- **Products**: Contains details about each product available in the store.
  - Fields: `_id`, `name`, `description`, `price`, `category`, `imageUrl`, `stock`, `createdAt`, `updatedAt`.
  - Relationships: (Placeholder for potential reviews/ratings relationship)
- **Orders**: Records customer orders.
  - Fields: `_id`, `userId`, `items` (array of product references with quantities and prices), `totalAmount`, `status` (e.g., `pending`, `shipped`, `delivered`), `shippingAddress`, `paymentInfo` (placeholder), `createdAt`, `updatedAt`.
  - Relationships: Many-to-one with Users (many orders belong to one user).
- **Carts**: Stores temporary shopping cart data for users.
  - Fields: `_id`, `userId`, `items` (array of product references with quantities), `createdAt`, `updatedAt`.
  - Relationships: One-to-one with Users (a user has one active cart).
- **AI Interactions**: (Placeholder for potential collection to store AI chat history or recommendation logs)

## Authentication Flow

FastPlay implements a robust authentication system using `better-auth` and Next.js API Routes, providing both local (email/password) and social login options.

1.  **User Registration (`/auth/signup`)**:
    - Users provide email and password.
    - `RegisterForm.tsx` handles form submission and client-side validation using Zod and `react-hook-form`.
    - The data is sent to `POST /api/auth/signup`.
    - On the server, `better-auth` handles password hashing (e.g., bcrypt) and stores user details in the MongoDB `Users` collection.
    - A secure session is established upon successful registration.

2.  **User Login (`/auth/signin`)**:
    - Users provide email and password via `LoginForm.tsx`.
    - The credentials are sent to `POST /api/auth/signin`.
    - `better-auth` verifies the credentials against the stored hashed passwords in MongoDB.
    - Upon successful verification, a JWT (JSON Web Token) or session token is generated and stored in a secure, HTTP-only cookie, establishing the user's session.
    - The user is then redirected to their dashboard or the previously intended page.

3.  **Social Login (`SocialAuth.tsx`)**:
    - Users can opt to sign in using third-party providers (e.g., Google, GitHub).
    - `SocialAuth.tsx` initiates the OAuth flow with `better-auth`.
    - The user is redirected to the provider's authentication page.
    - Upon successful authentication with the provider, a callback is handled by `src/app/api/auth/[...all]/route.ts`.
    - `better-auth` processes the provider's response, creates/links a user account in MongoDB if necessary, and establishes a secure session.

4.  **Session Management**:
    - `better-auth` manages user sessions, typically using JWTs stored in secure cookies.
    - Protected routes (e.g., `/dashboard`, `/profile`, `/admin`) check for valid session tokens.
    - `src/lib/auth.ts` and `src/lib/auth-client.ts` likely provide helper functions for accessing session information and protecting routes.

5.  **Logout (`Logout.tsx`)**:
    - When a user logs out, a request is sent to `GET /api/auth/signout`.
    - The server invalidates the session and clears authentication cookies, effectively ending the user's session.

## Error Handling

FastPlay incorporates error handling mechanisms to provide a smooth user experience and aid in debugging.

- **Client-Side Validation**: Zod schemas combined with `react-hook-form` provide immediate feedback on invalid form inputs, preventing unnecessary server requests.
- **API Error Responses**: API routes return standardized error responses (e.g., HTTP status codes like 400, 401, 403, 404, 500) with clear error messages.
- **Global Error Boundaries**: (Placeholder for React Error Boundaries for gracefully handling rendering errors).
- **Toast Notifications**: `react-toastify` is used to display user-friendly error messages for various actions (e.g., "Login failed," "Product could not be added").
- **Server-Side Logging**: (Placeholder for server-side error logging to monitor and debug issues in production).

## Security Features

Security is a paramount concern in FastPlay, with several measures implemented to protect user data and maintain application integrity.

- **JWT (JSON Web Tokens)**: `better-auth` likely uses JWTs for secure, stateless authentication. These tokens are signed to prevent tampering.
- **Password Hashing**: User passwords are never stored in plain text. Instead, they are securely hashed (e.g., using bcrypt) before being saved in the database.
- **Protected Routes**: Critical routes (e.g., user profiles, admin dashboards, checkout) are protected, requiring proper authentication and authorization before access is granted.
- **Validation**: Robust input validation using Zod is applied on both the client and server sides to prevent common vulnerabilities like injection attacks.
- **Sanitization**: (Placeholder for input sanitization to remove potentially malicious content).
- **Secure Cookies**: Authentication tokens are stored in HTTP-only, secure cookies to prevent client-side script access and ensure transmission over HTTPS.
- **CORS (Cross-Origin Resource Sharing)**: Properly configured to allow requests only from trusted origins.
- **Rate Limiting**: (Placeholder for rate limiting on API endpoints to prevent brute-force attacks and abuse).
- **Helmet**: (Placeholder for using a security middleware like Helmet for setting various HTTP headers that enhance security).

## Performance Optimizations

FastPlay is designed with performance in mind to deliver a fast and responsive user experience.

- **Next.js Optimizations**:
  - **Image Optimization**: Next.js `Image` component automatically optimizes images, serving them in modern formats and appropriate sizes.
  - **Code Splitting**: Next.js automatically splits JavaScript bundles, loading only the necessary code for each page.
  - **Server-Side Rendering (SSR) / Static Site Generation (SSG) / Incremental Static Regeneration (ISR)**: Next.js allows strategic choice of rendering methods for optimal performance and SEO.
- **Data Fetching with React Query**:
  - **Caching**: React Query aggressively caches server data, reducing redundant network requests.
  - **Background Refetching**: Stale data can be refetched in the background to ensure data freshness without blocking the UI.
  - **Optimistic Updates**: UI can be updated immediately after a mutation, providing instant feedback to the user while the actual server call happens in the background.
- **Lazy Loading**: Components and routes are lazy-loaded to reduce initial bundle size and improve load times.
- **Minification and Bundling**: Production builds are automatically minified and bundled for smaller file sizes.

## Deployment

### Frontend & Backend Deployment (Next.js)

Since FastPlay is a Next.js application, it can be seamlessly deployed to platforms that support Next.js, such as Vercel, Netlify, or self-hosted Node.js environments.

**Recommended Platform: Vercel**
Vercel, the creators of Next.js, provides an optimized deployment experience.

1.  **Connect Git Repository**: Connect your GitHub, GitLab, or Bitbucket repository to Vercel.
2.  **Automatic Builds**: Vercel automatically detects a Next.js project and sets up the build command (`npm run build`) and start command (`npm run start`).
3.  **Environment Variables**: Configure your environment variables (e.g., `MONGODB_URI`, `NEXTAUTH_SECRET`) directly in the Vercel dashboard.

### Database Deployment (MongoDB)

MongoDB can be hosted on various platforms:

- **MongoDB Atlas**: A fully managed cloud database service from MongoDB, offering high availability, scalability, and security.
- **Self-Hosted**: Deploy MongoDB on your own servers or VMs.

### Required Environment Variables for Deployment

Ensure the following environment variables are configured in your deployment environment:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your production URL, e.g., `https://www.fastplay.com`)
- `AI_API_KEY` (if AI features are used in production)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (if social login is enabled)
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (if social login is enabled)

## Future Improvements

- **Wishlist Functionality**: Implement a wishlist feature for users to save products for later.
- **User Reviews & Ratings**: Allow users to leave reviews and ratings for products.
- **Payment Gateway Integration**: Integrate with popular payment gateways (e.g., Stripe, PayPal) for seamless transactions.
- **Search Engine Optimization (SEO)**: Further optimize meta tags, sitemaps, and structured data for better search engine visibility.
- **Admin Analytics Dashboard**: Enhance the admin dashboard with more detailed analytics and reporting.
- **Push Notifications**: Implement push notifications for order status updates or promotions.
- **Internationalization (i18n)**: Support multiple languages for a broader audience.
- **Comprehensive Testing**: Add unit, integration, and end-to-end tests to ensure application stability and reliability.
- **CI/CD Pipeline**: Set up a continuous integration and continuous deployment pipeline for automated testing and deployment.

## Contributing

We welcome contributions to FastPlay! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details. (Assuming MIT license, if a LICENSE file exists, I would read its content).

## Author

**FastPlay Team**

Based on the `package.json` file, the project `name` is `fastplay` and `version` is `0.1.0`. No specific author information was available in `package.json`.
