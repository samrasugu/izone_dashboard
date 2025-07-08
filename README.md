# IZONE Dashboard

A real-time SaaS analytics dashboard built with Next.js and TypeScript. Features four interactive widgets that fetch data from mock APIs and refresh every 10 seconds.

## Features

- **Real-time Data**: Four widgets auto-refresh every 10 seconds
- **Custom Hooks**: Uses `useDataFetcher` hook for optimized data fetching
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean design system with CSS custom properties
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Efficient rendering and state management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **API**: JSONPlaceholder for mock data

## Dashboard Widgets

### 1. Audience Metrics
Shows user statistics and engagement data. Displays user names with post and comment counts in a bar chart format.

### 2. Sales Analytics  
Revenue tracking with monthly trends. Features a line chart showing revenue growth over time with percentage indicators.

### 3. Server Monitor
System health monitoring dashboard. Shows CPU usage, memory consumption, and disk space with colored progress indicators.

### 4. Growth Insights
Performance trends and metrics. Displays key performance indicators with up/down trend arrows and percentage values.

## Project Structure

```
├── app/
│   ├── dashboard/          # Main dashboard page
│   ├── globals.css         # Global styles and CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   ├── widgets/            # Dashboard widget components
│   └── ui/                 # Reusable UI components
├── hooks/
│   └── useApiData.ts       # Custom data fetching hook
├── lib/
│   └── api-endpoints.ts    # Centralized API configuration
└── types/
    └── dashboard.ts        # TypeScript type definitions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## API Integration

The dashboard uses JSONPlaceholder API endpoints:
- Users: `/users` - For audience metrics
- Posts: `/posts` - For sales analytics
- Albums: `/albums` - For server monitoring
- Comments: `/comments` - For growth insights

All API calls are centralized in `lib/api-endpoints.ts` for easy configuration.

## Development

The dashboard is built with modern React patterns:
- Function components with hooks
- TypeScript for type safety
- Custom hooks for data fetching
- Responsive design principles
- Clean code architecture

## Key Components

- `useDataFetcher`: Custom hook for API data management
- `MetricCard`: Reusable widget container
- `ActivityIndicator`: Loading state component
- `AlertBanner`: Error handling component

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
