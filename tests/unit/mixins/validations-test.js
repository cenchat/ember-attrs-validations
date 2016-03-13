import Ember from 'ember';
import AttrsValidationsMixin from 'ember-attrs-validations/mixins/validations';
import { module, test } from 'qunit';

import sinon from 'sinon';

const {
  Component
} = Ember;

module('Unit | Mixin | attrs validations');

test('didReceiveAttrs - satisfies isRequired - doesn\'t throw', function(assert) {
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

test('didReceiveAttrs - doesn\'t satisfy isRequired - throws', function(assert) {
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

test('didReceiveAttrs - satisfy type - doesn\'t throw', function(assert) {
  assert.expect(1);

  // Arrange
  let AttrsValidationsObject = Component.extend(AttrsValidationsMixin);
  let subject = AttrsValidationsObject.create({
    attrs: {
      username: 12345,
    },
    attrValidations: {
      username: {
        type: 'number',
      }
    },

    _failValidation() {}
  });
  let spy = sinon.spy();

  subject._failValidation = spy;

  // Act
  subject.didReceiveAttrs();

  // Assert
  assert.ok(!spy.called);
});

test('didReceiveAttrs - doesn\'t satisfy type - throws', function(assert) {
  assert.expect(1);

  // Arrange
  let AttrsValidationsObject = Component.extend(AttrsValidationsMixin);
  let subject = AttrsValidationsObject.create({
    attrs: {
      username: 'Test',
    },
    attrValidations: {
      username: {
        type: 'number',
      }
    },

    _failValidation() {}
  });
  let stub = sinon.stub();

  subject._failValidation = stub;

  // Act
  subject.didReceiveAttrs();

  // Assert
  assert.ok(stub.calledWith('Attribute username should be of type number'));
});
