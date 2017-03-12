import * as Utils from './utils'

describe('isError', () => {
  it('should return false if no error in meta', () => {
    const props = {
      meta: {
        error: null
      }
    }
    expect(Utils.isError(props)).toBe(false)
  })
  it('should return true if error in meta', () => {
    const props = {
      meta: {
        error: 'some error'
      }
    }
    expect(Utils.isError(props)).toBe(true)
  })
})

describe('isTouched', () => {
  it('should return meta touched', () => {
    const props = {
      meta: {
        touched: true
      }
    }
    expect(Utils.isTouched(props)).toBe(true)
  })
})

describe('isPristine', () => {
  it('should return meta pristine', () => {
    const props = {
      meta: {
        pristine: true
      }
    }
    expect(Utils.isPristine(props)).toBe(true)
  })
})

describe('withValidationState', () => {
  it('should add validation state success if no error in meta', () => {
    const props = {
      meta: {
        error: null,
        touched: true
      }
    }
    const expected = {
      meta: {
        error: null,
        touched: true
      },
      validationState: 'success'
    }
    expect(Utils.mapValidationState(props)).toEqual(expected)
  })
  it('should add validation state error if error in meta', () => {
    const props = {
      meta: {
        error: 'some error',
        touched: true
      }
    }
    const expected = {
      meta: {
        error: 'some error',
        touched: true
      },
      validationState: 'error'
    }
    expect(Utils.mapValidationState(props)).toEqual(expected)
  })
  it('should validationState: "" if not touched', () => {
    const props = {
      meta: {
        error: '',
        pristine: true,
        touched: false
      }
    }
    const expected = {
      meta: {
        error: '',
        pristine: true,
        touched: false
      },
      validationState: ''
    }
    expect(Utils.mapValidationState(props)).toEqual(expected)
  })
  it('should validationState: "" if pristine', () => {
    const props = {
      meta: {
        error: '',
        pristine: true,
        touched: true
      }
    }
    const expected = {
      meta: {
        error: '',
        pristine: true,
        touched: true
      },
      validationState: ''
    }
    expect(Utils.mapValidationState(props)).toEqual(expected)
  })
})
