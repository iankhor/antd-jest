import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event'
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

export default function App({children}) {
  const [foobar, setFoobar] = useState('unit')

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { onError: () => setFoobar('Global error')}
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {children({ foobar, setFoobar })}
      </div>
    </QueryClientProvider>
  );
}

function Demo({ foobar, setFoobar, buildOverrideOnErrorConfig }) {
  const { mutate } = useMutation(
    () => Promise.reject("Something went wrong."),
    { ...buildOverrideOnErrorConfig(setFoobar)}
  );

  const handleClick = (e) => mutate();
  return (
    <>
      <button aria-label="foobar" onClick={handleClick}>Trigger an error via mutation</button>
      <div>{foobar}</div>
    </>
  );
}

test('local error', async () => {
  const buildOverrideOnErrorConfig = (setFoobar) => ({ onError: () => setFoobar("Local error")})

  render(
    <App>
      {({foobar, setFoobar}) => <Demo foobar={foobar} setFoobar={setFoobar} buildOverrideOnErrorConfig={buildOverrideOnErrorConfig}/>}
    </App>
  );

  expect(screen.queryByText('Global error')).not.toBeInTheDocument()
  expect(screen.queryByText('Local error')).not.toBeInTheDocument()
  const foobarButton = screen.getByRole('button', { name: /foobar/i })
  user.click(foobarButton)

  await waitFor(() => {
    expect(screen.queryByText('Global error')).not.toBeInTheDocument()
    expect(screen.getByText('Local error')).toBeInTheDocument()
  })
});

test('global error', async () => {
  const buildOverrideOnErrorConfig = () => ({ })

  render(
    <App>
      {({foobar, setFoobar}) => <Demo foobar={foobar} setFoobar={setFoobar} buildOverrideOnErrorConfig={buildOverrideOnErrorConfig}/>}
    </App>
  );

  expect(screen.queryByText('Global error')).not.toBeInTheDocument()
  expect(screen.queryByText('Local error')).not.toBeInTheDocument()
  const foobarButton = screen.getByRole('button', { name: /foobar/i })
  user.click(foobarButton)

  await waitFor(() => {
    expect(screen.getByText('Global error')).toBeInTheDocument()
    expect(screen.queryByText('Local error')).not.toBeInTheDocument()
  })
});

