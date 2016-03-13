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

        if (object.isRequired) {
          this._validateIsRequired(attrKey);
        }

        if (objectType) {
          this._validateType(attrKey, objectType);
        }
      }
    }
  },

  /**
   * Validate isRequired
   *
   * @param {string} attribute Attribute to check
   */
  _validateIsRequired(attribute) {
    if (isNone(this.getAttr(attribute))) {
      this._failValidation(`Required attribute ${attribute} is undefined`);
    }
  },

  /**
   * Validate type
   *
   * @param {string} attribute Attribute to check
   * @param {string} type Expected type of attribute
   */
  _validateType(attribute, expectedType) {
    if (typeOf(this.getAttr(attribute)) !== expectedType) {
      this._failValidation(
          `Attribute ${attribute} should be of type ${expectedType}`);
    }
  },

  /**
   * Wrapper for Ember.assert so we could make it unit-testable
   *
   * @param {string} message
   */
  _failValidation: assert
});
