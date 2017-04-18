// ----------------------
// IMPORTS

// Apollo client library
import { createNetworkInterface, ApolloClient } from 'react-apollo';

// Custom configuration/settings
import { APOLLO } from 'config/project';

// ----------------------

// Create a new Apollo network interface, to point to our API server.
// Note:  By default in this kit, we'll connect to a sample endpoint that
// repsonds with simple messages.  Update [root]/config.js as needed.
const networkInterface = createNetworkInterface({
  uri: APOLLO.uri,
});

// Helper function to create a new Apollo client, by merging in
// passed options alongside the defaults
function createClient(opt = {}) {
  return new ApolloClient({
    reduxRootSelector: (state: any) => state.apollo,
    networkInterface,
    ...opt,
  });
}

// Creates a new browser client
export function browserClient() {
  return createClient();
}

// Creates a new server-side client
export function serverClient() {
  return createClient({
    ssrMode: true,
  });
}
