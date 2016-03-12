import Ember from 'ember';
import AttrsValidationsMixin from 'ember-attrs-validations/mixins/attrs-validations';
import { module, test } from 'qunit';

import sinon from 'sinon';

const {
  Component
} = Ember;

module('Unit | Mixin | attrs validations');

test('didReceiveAttrs - attr is valid - doesn\'t throw', function(assert) {
  assert.expect(1);

  // Arrange
  let AttrsValidationsObject = Component.extend(AttrsValidationsMixin);
  let subject = AttrsValidationsObject.create({
    attrs: {
      username: 'cenchat',
    },
    attrValidations: {
      username: {
        isRequired: true
      }
    }
  });
  let spy = sinon.spy();

  subject._failValidation = spy;

  // Act
  subject.didReceiveAttrs();

  // Assert
  assert.ok(!spy.called);
});

test('didReceiveAttrs - attr is invalid - throws', function(assert) {
  assert.expect(1);

  // Arrange
  let AttrsValidationsObject = Component.extend(AttrsValidationsMixin);
  let subject = AttrsValidationsObject.create({
    attrs: {
      username: null,
    },
    attrValidations: {
      username: {
        isRequired: true,
      }
    },

    _failValidation() {}
  });
  let stub = sinon.stub();

  subject._failValidation = stub;

  // Act
  subject.didReceiveAttrs();

  // Assert
  assert.ok(stub.calledWith('Required attribute username is undefined'));
});
