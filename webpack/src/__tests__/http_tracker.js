import React from 'react';
import renderer from 'react-test-renderer';
import { HttpTracker } from '../components/http_tracker';

it('renders as expected', () => {
  const mockStart = jest.fn();
  const mockEdit = jest.fn();
  const editedRequest = { method: 'POST', url: '' };

  const call1 = {
    req: new Request('https://www.google.com/lol'),
    res: null,
  };

  const call2 = {
    req: new Request('https://www.google.com/lol', { method: 'POST' }),
    res: new Response(),
  };

  const call3 = {
    req: new Request('https://www.google.com/lol'),
    error: new Error('Something went wrong!!'),
  };

  const tree = renderer.create(
    <HttpTracker
      onStartCall={mockStart}
      onEditRequest={mockEdit}
      editedRequest={editedRequest}
      calls={[call1, call2, call3]}
    />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
