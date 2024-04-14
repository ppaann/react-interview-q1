# Solution

## UI Design

Mockup: [mockup.png](mockup.png)

### Form

#### The input have 4 states:

1. initial state: normal input
2. Validating state: the content is been validating, shown as a refreshing icon (todo: make it more visible)
3. Valid state: the name is valid, shown as green with a checked icon
4. Error state: there's something wrong, shown as red with a cross icon and error reason is shown below the input

#### From validation

1. Name must be valid
2. location must be selected: use pop up as error indicator(in the demo)

## Feature

### Fetch selection data

Selection data is fetched from the API and s

### Responsive Layout

The breakpoint is at 600px in this demo

### Input error state

Handle empty and validation failed error

## TODO

1. Fix: flashing in fetching selection data
2. Input/CSS should be modulized
3. Select error display
4. Redux can be considered to manage the form state.
