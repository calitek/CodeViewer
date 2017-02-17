
const initialFileState = {
  fileData: ''
};

export default function handleActions(state = initialFileState, action) {
  let _fileState = Object.assign({}, state);
  switch (action.type) {
    case 'GetFileDataDone': _fileState.fileData = action.data; return _fileState;
    case 'GetTreeDataDone': _fileState.fileData = ''; return _fileState;
    default: return state;
  }
}
