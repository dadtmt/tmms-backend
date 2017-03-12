import R from 'ramda'

export const isTouched = R.path(['meta', 'touched'])

export const isPristine = R.path(['meta', 'pristine'])

export const isError = R.pipe(R.path(['meta', 'error']), R.isNil, R.not)

export const mapValidationState = R.ifElse(
  R.and(
    isTouched,
    R.complement(isPristine)
  ),
  R.ifElse(
    isError,
    R.assoc('validationState', 'error'),
    R.assoc('validationState', 'success')
  ),
  R.assoc('validationState', '')
)
