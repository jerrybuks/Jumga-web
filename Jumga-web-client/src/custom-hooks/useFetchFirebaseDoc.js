import { useState, useEffect } from 'react';

export default function useFetchFirebaseDoc(docRef, initState = null, shouldExec = true) {
    const [state, setstate] = useState({ data: initState, loading: true, error: null })

    useEffect(() => {
        async function fetchData() {
            if (shouldExec) {
                try {
                    const doc = await docRef.get()
                    setstate({ ...state, loading: false, data: doc.exists ? { ...doc.data(), docId: doc.id } : null })
                } catch (error) {
                    setstate({ ...state, loading: false, error })
                }
            } else {
                setstate({ ...state, loading: false })
            }
        }
        fetchData()
        //eslint-disable-next-line
    }, [])

    return [state, setstate]
}