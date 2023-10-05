# About
API for keeping track of salaries to allow for better informed conversations.


# API Docs

# GET `/surveys/{id?}`
*ID is optional*

## Query params
| Query param         | Value  |
|--|---|
| grade | "pass" \| "merit" \| "distinction" |
| industry | "finance"  |
*P.S. grade is an enum - the only values that return anything will be pass, merit and distinction*
## Success Response

Code: `200 OK`

**Response body:**

No ID / Get all
```json
[
    {
        "industry": "finance",
        "old_salary": 25000,
        "new_salary": 42000,
        "apprenticeship_grade": "merit"
    },
    {
        "industry": "finance",
        "old_salary": 25000,
        "new_salary": 45000,
        "apprenticeship_grade": "distinction"
    },
    {
        "industry": "finance",
        "old_salary": 25000,
        "new_salary": 40000,
        "apprenticeship_grade": "distinction"
    }
]
```

With ID / Get one
```json
{
    "industry": "finance",
    "old_salary": 25000,
    "new_salary": 40000,
    "apprenticeship_grade": "distinction"
}
```

# POST `/surveys/`

**Request body:**

```json
{
    "industry" : "finance",
    "old_salary" : 25000,
    "new_salary" : 45000,
    "apprenticeship_grade" : "distinction"
}
```

## Success Response

Code: `201 OK`

**Response body**

```json
"651d2ee02a19823314e70022"
```

**This is the ID for the created job. You must keep this safe if you want to make changes/delete the job**

# PUT `/surveys/{id}`

**Request body:**

```json
{
    "industry" : "finance",
    "old_salary" : 25000,
    "new_salary" : 47000,
    "apprenticeship_grade" : "distinction"
}
```

## Success Response

Code: `200 OK`

**Response body**

```json
{
    "industry" : "finance",
    "old_salary" : 25000,
    "new_salary" : 47000,
    "apprenticeship_grade" : "distinction"
}
```
