const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 jam
const SESSION_KEY = 'user_session';

export const sessionManager = {
    setSession(token, user) {
        const session = {
            token,
            user,
            expiry: new Date().getTime() + SESSION_DURATION,
            createdAt: new Date().getTime()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    },

    getSession() {
        try {
            const sessionStr = localStorage.getItem(SESSION_KEY);
            if (!sessionStr) return null;

            const session = JSON.parse(sessionStr);
            const now = new Date().getTime();

            // Cek expired
            if (now > session.expiry) {
                this.clearSession();
                return null;
            }
            return session;

        } catch (error) {
            console.error('Session parse error:', error);
            this.clearSession();
            return null;
        }
    },

    clearSession() {
        localStorage.removeItem(SESSION_KEY);
    },

    isSessionValid() {
        const session = this.getSession();
        return !!session;
    },

    updateSessionExpiry() {
        const session = this.getSession();
        if (session) {
            session.expiry = new Date().getTime() + SESSION_DURATION;
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        }
    },

    getSessionInfo() {
        const session = this.getSession();
        if (!session) return null;

        return {
            user: session.user,
            createdAt: new Date(session.createdAt),
            expiresAt: new Date(session.expiry),
            remainingTime: session.expiry - new Date().getTime()
        };
    }
};