# Bam-book — Frontend

Bam-book (working name) is a web app that connects readers with their local bookshop. Readers search for books, keep their reading lists and order a book from the bookshop they choose. Bookshops manage their catalogue and follow the orders from a back office.

This is the frontend of Bam-book, the final project (TFF) of the Full Stack JavaScript program at Bruxelles Formation. The backend API lives in a separate repository.

## Features

### Readers

* Sign up, log in and log out
* Home page with genre sections, loaded one by one
* Search by title, author or ISBN
* Book detail page
* To read and Read lists
* Order a book from a bookshop, with an optional message
* Order history with statuses
* Editable profile page

### Bookshops

* Registration and login
* Catalogue with add, edit and delete
* Search and sorting in the catalogue
* Stock and "in order" counter for each book
* Orders table with status and price
* Editable profile page

## Tech stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4

## Project structure

* `app`: pages, grouped by area (auth, client, bookshop)
* `components`: UI, forms, lists and orders
* `actions`: Server Actions, they read the login cookie
* `services`: calls to the backend
* `types` and `constants`: shared types and the list of genres

## Accessibility

* Visible focus outline when using the keyboard
* A real label on every form field
* Statuses shown with text and icon, not only with colour
* Screen readers announce errors and confirmations
* Expandable cards use `aria-expanded`
* Sortable table columns use `aria-sort`
* Dialogs have `role="dialog"` and close with the Escape key
* Scrollable tables can be reached with the keyboard
* One `h1` for each page
* Decorative images have an empty `alt`
* Links go to pages and buttons do actions
* Text colour chosen for contrast, white text only on the darkest green
* Buttons and icon buttons are at least 44px high on mobile
* Loading placeholders animate only if the user allows motion

## Design decisions

* The login token is stored in an httpOnly cookie and only read on the server, by Server Actions.
* Roles are checked in the backend, and each role has its own area after the login.
* Books in lists, orders and the catalogue are identified by ISBN. The Google Books id is only used for the detail page.
* The search term lives in the URL, so results survive the back button. Each genre section loads on its own.
* The bookshop back office has its own UI components, separate from the reader ones.

## Limitations and future plans

* **Custom lists:** shown as a disabled stub. Planned: a working "Add to a list" button, once the backend supports it.
* **Book details from a list:** opened by looking up the ISBN on Google. Planned: save the Google id together with the ISBN.
* **Change password:** disabled button.
* **Forgot password:** stub page.
* **Messages:** "Send a message" in the order history is disabled.
* **Accounting:** stub page for the bookshop back office.
* **Back office on mobile:** minimal adaptation only. Planned: a real mobile design, with orders as cards.
* **Orders:** one book per order.
* **Search:** English only, and it depends on the data from Google. Planned: a language choice for the user.
* **Robustness:** planned — focus trap in dialogs.

## Author

Pietro Carlini
