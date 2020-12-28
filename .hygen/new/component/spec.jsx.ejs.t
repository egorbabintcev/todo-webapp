---
to: "<%= generateSpec ? `${absPath}/${componentName}.spec.jsx` : null %>"
---

import { render, screen } from '@testing-library/react';
import <%= componentName %> from './';

describe('<%= componentName %> component', () => {
  it('Should be', () => {});
});
