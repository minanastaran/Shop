const FileUpload = ({ formatfile, multiple, showfilename, Upload_Func, showimg, from }) => {

  const valid = from==='general'? null :showfilename.includes("type")
  // console.log(showfilename.length);
  // console.log(showimg);
  // console.log(valid);

  return (
    <label className='fileupload'>

      <input
        style={{ display: "none" }}
        type='file'
        accept={formatfile}
        multiple={multiple}
        onChange={Upload_Func} />

        {from==='general'?
         showimg && showfilename !== "type" ? 
              <img src={URL.createObjectURL(showimg)} alt=' ' className='imgupload'/>
              :
            <>
            <span className='fileupload_text'>
              { "برای آپلود فایل کلیک کنید."}
            </span>
            <span>
              {showfilename==="type" && "فایل نامعتبر میباشد" }
            </span>
            </>
          
      :
      /*-------------------------*/
      showimg[0] && !valid ?
        from === 'edit' && showfilename.length === 0 ?
          showimg.map((item, index) => {
            return (
              <img src={`http://localhost:5000/${item}`} alt=' ' className='imgupload' />

            )
          })
          :
          showimg.map((item, index) => {
            return (
              <img key={index} src={URL.createObjectURL(item)} alt=' ' className='imgupload' />
            )
          })
        :
        <>
          <span className='fileupload_text'>
            {"برای آپلود فایل کلیک کنید."}
          </span>
          <span>
            {valid && "فایل نامعتبر میباشد"}
          </span>
        </>
      /*-------------------------*/
      }
     
    </label>
  )
}
export default FileUpload;

/*-------------------------*/
// const FileUpload =({formatfile,multiple,showfilename,Upload_Func,showimg,from})=>{
//   return(
//       <label className='fileupload'>

//           <input
//               style={{display: "none"}}
//               type='file'
//               accept={formatfile}
//               multiple={multiple}
//               onChange={Upload_Func} />
//               {showimg && showfilename !== "type" ? 
//               from ==='edit' ?  <img src={`http://localhost:5000/${showimg}`} alt=' ' className='imgupload'/> :
//                 <img src={URL.createObjectURL(showimg)} alt=' ' className='imgupload'/>
//               :
//               <>
//               <span className='fileupload_text'>
//                 { "برای آپلود فایل کلیک کنید."}
//               </span>
//               <span>
//                 {showfilename==="type" && "فایل نامعتبر میباشد" }
//               </span>
//               </>
//             }
//       </label>
// )
// }
// export default FileUpload;