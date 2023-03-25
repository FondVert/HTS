# API
## Login (V)
Input
- User  "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- Password  "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
Output
- Token
## Register (V)
Input
- Name "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- User  "\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"
- Password "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
Output
- Token
## Post (V)
Input
- Title
- Description
- Image
- Content
- Token
Output
- Post ID
## Vote (V)
Input
- type (0:reset, 1:good, 2:bad)
- Token
## GetList (V)
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
## GetPost (V)
Input
- Post ID
- Token
Output
- Data (Image ID, Title, Description, Content, Ratio, Time)
## Save (V)
Input
- Post ID
- Token
## ViewImage
Input
- Post ID
- Token
Output
- row data (b64)
## GetSave (V)
Input
- Token
Output
- Data (Image ID, Title, Description, Ratio, Time)