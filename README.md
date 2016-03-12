# Ember Attrs Validations

Gone are the days where you forgot to pass an attribute from a parent to a child component.
This addon will throw an error *only* in your test runs whenever a required attribute is undefined.

## Usage

Currently only supports validations for required fields.

```js
import Ember from 'ember';
import AttrsValidationsMixin from 'ember-attrs-validations/mixins/attrs-validations';

const {
  Component
} = Ember;

export default Component.extend(AttrsValidationsMixin, {
  attrValidations: {
    firstName: {
      isRequired: true
    },
    lastName: {
      isRequired: true
    }
  }
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
