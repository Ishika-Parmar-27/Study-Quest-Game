#DAY1
Today's goal- Project Structure
Created frontend and backend, also server.js is working properly and gives output as Server running on port 5000
#DAY2
I have completed backend structure , connected MongoDB Atlas
--What I learned
I have learned how MongoDB connects Mongoose and importance of modular backend structure
--My next goal is to create user authentication model 
#DAY3
--Authentication Module 
1 User Registration
2 User Login
3Password Hashing (bcrypt)
4 JWT Authentication
5 Protected Routes
6 User Profile API
--Quest Module 
1 Quest Model Created
2 Create Quest API (In Progress)
--Tech Stack
1 React (Vite)
2 Node.js
3 Express.js
4 MongoDB Atlas
5 Mongoose
6 JWT
7 bcryptjs
--Features Planned
1 Create Study Quests
2 Complete Quests
3 Earn XP
4 Level Up
5 Daily Study Streaks
6 Achievement Badges
7 Progress Dashboard
8 Leaderboard
#DAY4
##Objectives
- Design Quest model
- Build Quest CRUD APIs
- Connect quests with logged-in user

##Completed
- Created Quest Schema
- Added fields:
  - user
  - title
  - description
  - xpReward
  - completed
  - completedAt
- Implemented Create Quest API
- Implemented Get My Quests API
- Implemented Update Quest API
- Implemented Complete Quest API
- Protected all quest routes using JWT authentication
- Tested all APIs successfully in Postman

##Learning
- MongoDB document relationships
- Protected routes in Express
- RESTful API design
- Updating MongoDB documents
#DAY5
## Objectives
- Convert normal task tracker into a game

## Completed

### XP System
- Created awardXP() service
- Users earn XP after completing quests

### Level System
- Implemented calculateLevel()
- Formula:
  Level = floor(XP / 100) + 1

### Study Streak
- Created updateStreak()
- Logic:
  - First completion → streak = 1
  - Consecutive day → streak++
  - Missed day → streak reset

### Badge System
Implemented badge unlocking logic.

Current badges:

- Beginner

Future-ready structure prepared for:
- Consistent Learner
- XP Hunter
- Quest Master
- Legend

## Learning
- Service Layer architecture
- Business logic separation
- Gamification concepts
- Date comparison logic
#DAY6
## Objectives
Create a personalized dashboard.

## Completed

Dashboard API returns:

### User Details
- Name
- Email
- XP
- Level
- Study Streak
- Badges

### Quest Statistics
- Total Quests
- Completed Quests
- Pending Quests

Implemented MongoDB queries for statistics.

Protected dashboard using JWT authentication.

Tested successfully.

## Learning
- Aggregating user data
- Dashboard design
- Combining multiple database queries

#DAY7
## Objectives
Track weekly study performance.

## Completed

Created Weekly Analytics API.

Used MongoDB Aggregation Pipeline.

Pipeline includes:

- $match
- $group
- $dateToString
- $sum
- $sort

Analytics returns:

- Date
- Completed Quests
- Total XP Earned

Created analytics routes.

Integrated API successfully.

## Learning
- MongoDB Aggregation Framework
- Grouping documents
- Date formatting
- Data visualization preparation

# Day 8 - Leaderboard Module

## Objectives
Introduce competition among users.

## Completed

Created Leaderboard API.

Implemented:

- User ranking
- XP sorting
- Level display
- Study streak display
- Badge display

Sorted users by highest XP.

Tested API successfully.

## Learning
- Sorting in MongoDB
- Ranking systems
- Competitive gamification

# Day 9 - React Frontend Setup

## Objectives
Initialize frontend.

## Completed

Created React application using Vite.

Installed:

- React Router
- Axios
- Tailwind CSS
- Recharts

Created project structure.

Configured routing.

Created pages:

- Login
- Register
- Dashboard
- Leaderboard
- Analytics

Created:

- AuthContext
- ProtectedRoute
- Axios instance

## Learning
- React project architecture
- Context API
- Routing
- API integration
# Day 10 - Authentication UI

## Objectives
Connect frontend with backend.

## Completed

Developed:

- Login Page
- Register Page

Integrated APIs.

Implemented:

- JWT storage
- Auto login
- Logout
- Protected dashboard
- Navigation after authentication

Verified authentication flow successfully.

## Learning
- Axios API calls
- React forms
- Local Storage
- Authentication flow
# Day 11 - Dashboard Integration

## Objectives
Display real user data.

## Completed

Integrated Dashboard API.

Displayed:

- User information
- XP
- Level
- Study streak
- Badge section
- Quest summary

Created:

- XP Progress Bar
- Badge Cards

Added navigation bar.

## Learning
- React state management
- API integration
- Dynamic rendering
- Progress indicators
# Day 12 - Quest Management UI

## Objectives
Complete quest workflow.

## Completed

Implemented:

- Create Quest Form
- Fetch User Quests
- Complete Quest Button

Dashboard updates automatically after quest completion.

XP updates instantly.

Quest status changes from:

Pending → Completed

Verified complete workflow.

## Learning
- CRUD operations in React
- State updates
- Refreshing UI after API calls

# Day 13 - Analytics & Leaderboard UI

## Objectives
Visualize study performance.

## Completed

Created:

Analytics Page

Integrated:

- Weekly Analytics API
- Recharts

Created:

Leaderboard Page

Displayed:

- Rank
- XP
- Level
- Streak
- Badges

Integrated navigation.

## Learning
- Data visualization
- React charts
- Dashboard analytics
- Ranking systems


