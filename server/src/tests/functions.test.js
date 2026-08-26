const { expect } = require('chai');
const { mapStringToValues } = require('./../utils/functions');

describe('Testing utils', () => {
  describe('Testing mapStringToValues', () => {
    it('Should return true:boolean when "true":string', () => {
      const result = mapStringToValues('true');
      const expected = true;
      expect(result).to.equal(expected);
    //   expect(result).to.be.true;
    });
    it('Should return false:boolean when "false":string', () => {
      const result = mapStringToValues('false');
      const expected = false;
      expect(result).to.equal(expected);
    //   expect(result).to.be.false;
    });
    it('Should return undefined:undefined when "undefined":string', () => {
      const result = mapStringToValues('undefined');
      const expected = undefined;
      expect(result).to.equal(expected);
    });
    it('Should return null:object when "null":string', () => {
      const result = mapStringToValues('null');
      const expected = null;
      expect(result).to.equal(expected);
    });
    it('Should return NaN:number when "NaN":string', () => {
      const result = mapStringToValues('NaN');
      expect(result).to.be.NaN;
    });
    it('Should return "4":string when "4":string', () => {
      const result = mapStringToValues('4');
      const expected = '4';
      expect(result).to.equal(expected);
    });
    it('Should return "qwerty":string when "qwerty":string', () => {
      const result = mapStringToValues('qwerty');
      const expected = 'qwerty';
      expect(result).to.equal(expected);
    });
  });
});
