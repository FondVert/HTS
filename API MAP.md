# API
## Login
Input
- User
- Password
Output
- Token
## Register
Input
- Name
- User
- Password
Output
- Token
## Post
Input
- Title
- Description
- Image
- Content
- Token
Output
- Post ID
## Vote
Input
- type (0:reset, 1:good, 2:bad)
- Token
## GetList
Input
- Type (newlest, oldest, good, bad)
- Token
Output
- Data (Image ID, Title, Description, Ratio, Time)
## Search
Input
- Keyword
- Token
Output
- Data
## GetPost
Input
- Post ID
- Token
Output
- Data (Image ID, Title, Description, Content, Ratio, Time)
## Save
Input
- Post ID
- Token
## ViewImage
Input
- Post ID
- Token
Output
- row data (b64)
## GetSave
Input
- Token
Output
- Data (Image ID, Title, Description, Ratio, Time)