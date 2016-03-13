import Ember from 'ember';
import config from 'ember-get-config';

const {
  Mixin,
  assert,
  isNone,
  typeOf
} = Ember;

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    this._validateAttrs();
  },

  /**
   * Validates attrs.
   *
   * An error will be thrown if an attr is invalid.
   */
  _validateAttrs() {
    let environment = config.environment;

    if (environment === 'test') {
      let attrValidations = this.get('attrValidations');

      for (let attrKey in attrValidations) {
        let object = attrValidations[attrKey];
        let objectType = object.type;
        let attrValue = this.getAttr(attrKey);

        if (object.isRequired) {
          this._validateIsRequired(attrKey, attrValue);
        }

        if (objectType && !isNone(attrValue)) {
          this._validateType(attrKey, attrValue, objectType);
        }
      }
    }
  },

  /**
   * Validate isRequired
   *
   * @param {string} attrKey Attribute key
   * @param {string} attrValue Attribute value
   */
  _validateIsRequired(attrKey, attrValue) {
    if (isNone(attrValue)) {
      this._failValidation(`Required attribute ${attrKey} is undefined`);
    }
  },

  /**
   * Validate type
   *
   * @param {string} attrKey Attribute key name
   * @param {string} attrValue Attribute value
   * @param {string} type Expected type of attribute
   */
  _validateType(attrKey, attrValue, expectedType) {
    if (typeOf(attrValue) !== expectedType) {
      this._failValidation(
          `Attribute ${attrKey} should be of type ${expectedType}`);
    }
  },

  /**
   * Wrapper for Ember.assert so we could make it unit-testable
   *
   * @param {string} message
   */
  _failValidation: assert
});
