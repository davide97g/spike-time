# Data Modeling

## Collections

### Users

users only have basic info and number of credits

### Slots

slots contain date/time info + user that booked them or unavaiability status

```
// ** GET ALL BOOKINGS FROM USER

get slots by userId = ${userId}

```

```
// ** GET ALL BOOKINGS FROM USER IN THE FUTURE

get slots by userId = ${userId} and date >= ${today}

```

```
// ** GET ALL UNAVAILABLE SLOTS

get slots by unavailable = true

```
