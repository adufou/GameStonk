export const addServer = server => ({type: 'addServer', server});

export const fetchServers = servers => ({type: 'fetchServers', servers});

export const deleteServer = server => ({type: 'deleteServer', server});

export const updateServer = server => ({type: 'updateServer', server});
