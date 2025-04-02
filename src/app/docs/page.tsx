import React from 'react';

const styles = {
    body: {
        backgroundColor: '#161b22',
        fontFamily: 'sans-serif',
        color: '#c9d1d9',
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    authWindow: {
        backgroundColor: '#21262d',
        borderRadius: 6,
        padding: 20,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        maxWidth: 400,
        width: '90%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2em',
        marginBottom: 15,
        color: 'white',
    },
    appInfo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
    },
    appInfoImg: {
        width: 32,
        height: 32,
        borderRadius: 4,
        marginRight: 10,
    },
    appName: {
        fontWeight: 'bold',
        color: 'white',
    },
    subtext: {
        fontSize: '0.9em',
        color: '#8b949e',
    },
    permissionSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#30363d',
        borderRadius: 4,
        marginBottom: 15,
    },
    permissionSectionLast: {
        marginBottom: 20,
    },
    accessInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    accessInfoImg: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    permissionText: {
        fontSize: '0.95em',
        color: '#8b949e',
        margin: 0,
    },
    accessLevel: {
        fontWeight: 'normal',
        backgroundColor: '#b65700',
        color: '#fff',
        padding: '2px 5px',
        borderRadius: 4,
        fontSize: '0.8em',
        marginLeft: 10,
    },
    readOnly: {
        backgroundColor: '#82403b',
        color: '#fff',
        padding: '2px 5px',
        borderRadius: 4,
        fontSize: '0.8em',
        marginLeft: 10,
    },
    orgAccess: {
        marginTop: 0,
        color: '#c9d1d9',
    },
    orgAccessP: {
        fontSize: '0.95em',
        marginBottom: 10,
    },
    orgItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#30363d',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
    },
    orgInfoImg: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    orgInfoSpan: {
        color: '#8b949e',
    },
    requestBtn: {
        backgroundColor: '#494f54',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    cancelBtn: {
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid #586069',
        padding: '8px 16px',
        borderRadius: 6,
        cursor: 'pointer',
        marginRight: 10,
        fontSize: '0.9em',
    },
    authorizeBtn: {
        backgroundColor: '#2ea44f',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    redirectInfo: {
        fontSize: '0.85em',
        color: '#8b949e',
        textAlign: 'center',
        marginTop: 15,
    },
    redirectLink: {
        color: '#0969da',
        textDecoration: 'underline',
    },
};

const AuthorizeApp: React.FC = () => (
    <div style={styles.body}>
      <div style={styles.authWindow}>
        <h2 style={styles.title}>Authorize Streamlit</h2>
        <div style={styles.appInfo}>
          <img src="data:image/svg+xml;base64,..." alt="App Icon" style={styles.appInfoImg} />
          <div>
            <div style={styles.appName}>Streamlit by Streamlit</div>
            <div style={styles.subtext}>wants to access your ft4bhi account</div>
          </div>
        </div>

        <div style={styles.permissionSection}>
          <div style={styles.accessInfo}>
            <img src="data:image/svg+xml;base64,..." alt="speaker icon" style={styles.accessInfoImg} />
            <div>Repository webhooks and services <span style={styles.accessLevel}>Admin access</span></div>
          </div>
        </div>

        <div style={styles.permissionSection}>
          <div style={styles.accessInfo}>
            <img src="data:image/svg+xml;base64,..." alt="computer icon" style={styles.accessInfoImg} />
            <div>Codespace <span style={styles.permissionText}>Manage codespaces</span></div>
          </div>
        </div>

        <div style={styles.permissionSection}>
          <div style={styles.accessInfo}>
            <img src="data:image/svg+xml;base64,..." alt="folder icon" style={styles.accessInfoImg} />
            <div>Repositories <span style={styles.permissionText}>Public repositories</span></div>
          </div>
        </div>

        <div style={styles.permissionSection}>
          <div style={styles.accessInfo}>
            <img src="data:image/svg+xml;base64,..." alt="grid icon" style={styles.accessInfoImg} />
            <div>Organizations and teams <span style={styles.readOnly}>Read-only access</span></div>
          </div>
        </div>


        <div style={{...styles.permissionSection, ...styles.permissionSectionLast}}>
          <div style={styles.accessInfo}>
            <img src="data:image/svg+xml;base64,..." alt="person icon" style={styles.accessInfoImg} />
            <div>Personal user data <span style={styles.permissionText}>Email addresses (read-only)</span></div>
          </div>
        </div>


        <div style={styles.orgAccess}>
            <p style={styles.orgAccessP}>Organization access</p>
            <div style={styles.orgItem}>
                <div style={styles.accessInfo}>
                    <img src="data:image/svg+xml;base64,..." alt="gray folder icon" style={styles.orgInfoImg} />
                    <span style={styles.orgInfoSpan}>CodeCompass X</span>
                </div>
                <button style={styles.requestBtn}>Request</button>
            </div>
            <div style={styles.orgItem}>
                <div style={styles.accessInfo}>
                    <img src="data:image/svg+xml;base64,..." alt="green leaf icon" style={styles.orgInfoImg} />
                    <span style={styles.orgInfoSpan}>zendalona X</span>
                </div>
                <button style={styles.requestBtn}>Request</button>
            </div>
        </div>

        <div style={styles.buttons}>
            <button style={styles.cancelBtn}>Cancel</button>
            <button style={styles.authorizeBtn}>Authorize streamlit</button>
        </div>

        <div style={styles.redirectInfo}>
            Authorizing will redirect to <a href="https://share.streamlit.io" style={styles.redirectLink}>https://share.streamlit.io</a>
        </div>
      </div>
    </div>
);

export default AuthorizeApp;