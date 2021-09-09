// import { useCallback, useRef, useEffect } from 'react'
// import axios from './baseurl'

// export const Mainaxios = () => {

//     const activeHttpRequests = useRef([])

//     const General_axios = useCallback(async (
//         url,
//         method = 'GET',
//         body = null,
//         headers = {}
//     ) => {

//         const AbortCtrl = new AbortController()
//         activeHttpRequests.current.push(AbortCtrl)

//         try {
//             const response = await fetch(url, {
//                 method: method,
//                 body: body,
//                 headers: headers,
//                 signal: AbortCtrl.signal
//             })
    
//             const responseData = await response.json()

//             activeHttpRequests.current = activeHttpRequests.current.filter(
//                 item => item !== AbortCtrl
//             )
    
//             if (!response.ok) {
//                 throw new Error(responseData.message)
//             }

//             return responseData

//         } catch (err) {
//             throw err
//         }
//     }, [])

//     useEffect(() => {
//         return () => {
//             activeHttpRequests.current.forEach(
//                 item => item.abort()
//             )
//         }
//     }, [])

//     return { General_axios }

// }