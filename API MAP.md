# API
## Login
Input
- User  "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- Password  "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
Output
- Token
## Register
Input
- Name "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- User  "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- Password "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
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