webpackJsonp([0],{

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/favicon.ico";

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/fire.ico";

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/leaf.ico";

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/moon.ico";

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/snow.ico";

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sun.ico";

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _tree = __webpack_require__(129);

var _tree2 = _interopRequireDefault(_tree);

var _file = __webpack_require__(248);

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AppCtrlSty = {
  height: '100%',
  padding: '0 10px 0 0'
};

exports['default'] = function () {
  return _react2['default'].createElement(
    'div',
    { id: 'AppCtrlSty', style: AppCtrlSty },
    _react2['default'].createElement(
      'div',
      { className: 'FlexBox', style: { height: 'calc(100% - 20px)' } },
      _react2['default'].createElement(_tree2['default'], null),
      _react2['default'].createElement(_file2['default'], null)
    )
  );
};

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(11);

var _redux = __webpack_require__(12);

var _jmsReactComponents = __webpack_require__(47);

var _tree = __webpack_require__(33);

var _api = __webpack_require__(247);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TreeCtrlSty = {
  flexGrow: '1',
  height: 'calc(100% - 19px)',
  overflowX: 'auto',
  resize: 'horizontal',
  width: '350px'
};

var options = {
  icon: { sun: 'dev', leaf: 'home', snow: 'sys' },
  typeName: ['node', 'type']
};

var readTreeBtn = { buttonid: 'readTree', text: 'Read Tree' };

var TreeCtrl = function () {
  function TreeCtrl(props) {
    var iconHandler = function () {
      function iconHandler(node) {
        props.setTreeNodeClosed(node);
      }

      return iconHandler;
    }();
    var clickHandler = function () {
      function clickHandler(node) {
        props.selectTreeNode(node);
      }

      return clickHandler;
    }();
    var readTreeHandler = function () {
      function readTreeHandler() {
        props.apiReadTree();
      }

      return readTreeHandler;
    }();
    return _react2['default'].createElement(
      'div',
      { id: 'TreeCtrl', style: TreeCtrlSty },
      _react2['default'].createElement(_jmsReactComponents.JButton, { btn: readTreeBtn, parentClickHandler: readTreeHandler }),
      _react2['default'].createElement(_jmsReactComponents.JTreeView, { data: props.treeState.treeData, options: options, iconClick: iconHandler, titleClick: clickHandler })
    );
  }

  return TreeCtrl;
}();

function mapStateToProps(store) {
  return { treeState: store.treeState };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ selectTreeNode: _tree.selectTreeNode, setTreeNodeClosed: _tree.setTreeNodeClosed, apiReadTree: _api.apiReadTree }, dispatch);
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TreeCtrl);

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = apiReadTree;
function apiReadTree() {
  return { type: 'ApiReadTree' };
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FileViewSty = {
  backgroundColor: '#232a1f',
  color: '#ccc',
  margin: '5px 20px',
  overflow: 'auto',
  width: '100%'
};

var FileCtrlSty = {
  marginBottom: '5%',
  width: '100%'
};

function FileView(_ref) {
  var fileState = _ref.fileState;

  var htmlDivSty = { width: '100%' };
  if (fileState.fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden';else htmlDivSty.overflow = 'auto';
  var fileHtml = { __html: fileState.fileData };
  return _react2['default'].createElement(
    'div',
    { id: 'FileViewCtrlRenderSty', style: FileViewSty },
    _react2['default'].createElement(
      'div',
      { id: 'FileCtrlSty', style: FileCtrlSty },
      _react2['default'].createElement('div', { dangerouslySetInnerHTML: fileHtml, style: htmlDivSty })
    )
  );
}

function mapStateToProps(store) {
  return { fileState: store.fileState };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)(FileView);

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(12);

var _reduxThunk = __webpack_require__(70);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(71);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _api = __webpack_require__(250);

var _api2 = _interopRequireDefault(_api);

var _api3 = __webpack_require__(251);

var _api4 = _interopRequireDefault(_api3);

var _file = __webpack_require__(252);

var _file2 = _interopRequireDefault(_file);

var _tree = __webpack_require__(253);

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var reducer = (0, _redux.combineReducers)({ fileState: _file2['default'], treeState: _tree2['default'] });
var middleware = [_reduxThunk2['default']];

var api = 1; // run in node-1 run in electron-2
if (api === 1) middleware.push(_api.wsMiddleware);else middleware.push(_api3.ipcMiddleware);

var useLogger = 1;
if (useLogger) middleware.push(_reduxLogger2['default']);

var store = (0, _redux.createStore)(reducer, _redux.applyMiddleware.apply(undefined, middleware));

if (api === 1) (0, _api2['default'])(store);else (0, _api4['default'])(store);

// store.dispatch({ type: 'ApiReadTree' });
store.dispatch({ type: 'ApiGetTreeData' });

exports['default'] = store;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wsMiddleware = wsMiddleware;

exports['default'] = function (store) {
  /* eslint-disable */
  socket = new io();
  /* eslint-enable */

  socket.on('server:GetFileDataDone', function (data) {
    store.dispatch((0, _file2['default'])(data.fileData));
  });

  socket.on('server:GetTreeDataDone', function (data) {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
};

var _file = __webpack_require__(72);

var _file2 = _interopRequireDefault(_file);

var _tree = __webpack_require__(33);

var treeActions = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var socket = null;

function wsMiddleware() {
  return function (next) {
    return function (action) {
      if (socket) {
        switch (action.type) {
          case 'ApiReadTree':
            socket.emit('client:readTree', {});
            break;
          case 'ApiGetFileData':
            socket.emit('client:getFileData', action.data);
            break;
          case 'ApiGetTreeData':
            socket.emit('client:getTreeData');
            break;
          case 'ApiSetTreeData':
            socket.emit('client:setTreeData', action.data);
            break;
          default:
            break;
        }
      }
      return next(action);
    };
  };
}

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipcMiddleware = ipcMiddleware;

exports['default'] = function (store) {
  ipc.on('server:GetFileDataDone', function (event, data) {
    store.dispatch(fileActions.getFileDataDone(data.fileData));
  });

  ipc.on('server:GetTreeDataDone', function (event, data) {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
};

var _file = __webpack_require__(72);

var fileActions = _interopRequireWildcard(_file);

var _tree = __webpack_require__(33);

var treeActions = _interopRequireWildcard(_tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function ipcMiddleware() {
  return function (next) {
    return function (action) {
      if (ipc) {
        switch (action.type) {
          case 'ApiReadTree':
            ipc.send('client:readTree', {});
            break;
          case 'ApiGetFileData':
            ipc.send('client:getFileData', action.data);
            break;
          case 'ApiGetTreeData':
            ipc.send('client:getTreeData');
            break;
          case 'ApiSetTreeData':
            ipc.send('client:setTreeData', action.data);
            break;
          default:
            break;
        }
      }
      return next(action);
    };
  };
}

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = handleActions;
var initialFileState = {
  fileData: ''
};

function handleActions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialFileState;
  var action = arguments[1];

  var _fileState = Object.assign({}, state);
  switch (action.type) {
    case 'GetFileDataDone':
      _fileState.fileData = action.data;
      return _fileState;
    case 'GetTreeDataDone':
      _fileState.fileData = '';
      return _fileState;
    default:
      return state;
  }
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports['default'] = handleActions;

var _lodash = __webpack_require__(73);

var _lodash2 = _interopRequireDefault(_lodash);

var _traverse = __webpack_require__(74);

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _gotTreeData(treedata) {
  var _currentTreeNode = _getSelected(treedata);
  if (_currentTreeNode === null) {
    ;

    var _treedata = _slicedToArray(treedata, 1);

    _currentTreeNode = _treedata[0];
  }return { treeData: treedata, currentTreeNode: _currentTreeNode };
}

function _getSelected(tree) {
  var result = null;
  _lodash2['default'].each(tree, function (node) {
    if (node.selected) result = node;
    if (result == null && node.children && node.children.length > 0) result = _getSelected(node.children);
  });
  return result;
}

function _getNodeIndex(_treeData, treeNode) {
  var treeData = _treeData;
  var nodeID = treeNode.nodeid;
  if (_lodash2['default'].isEmpty(nodeID)) {
    return [];
  }

  var nodeIdArray = nodeID.split('/');
  var searchID = nodeIdArray.shift();
  var nodeIndex = [];
  var index = void 0;
  var nextSearchID = void 0;

  while (searchID) {
    if (!treeData) {
      return [];
    }
    var treeItem = _lodash2['default'].find(treeData, { nodeid: searchID });
    index = _lodash2['default'].indexOf(treeData, treeItem);
    if (index < 0) {
      return [];
    }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += '/' + nextSearchID;
      treeData = treeData[index].children;
      if (treeData) {
        nodeIndex.push('children');
      }
    } else searchID = nextSearchID;
  }

  return nodeIndex;
}

function _selectTreeNode(_treeData, _currentTreeNode, treeNode) {
  var nodeIndex1 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex1.push('selected');
  (0, _traverse2['default'])(_treeData).set(nodeIndex1, false);
  _currentTreeNode = treeNode;
  var nodeIndex2 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex2.push('selected');
  (0, _traverse2['default'])(_treeData).set(nodeIndex2, true);

  return { treeData: _treeData, currentTreeNode: _currentTreeNode };
}

function _setTreeNodeClosed(_treeData, treeNode) {
  var nodeIndex = _getNodeIndex(_treeData, treeNode);
  nodeIndex.push('closed');
  var visible = (0, _traverse2['default'])(_treeData).get(nodeIndex);
  if (typeof visible === 'undefined') visible = false;else visible = !visible;
  if (visible) (0, _traverse2['default'])(_treeData).set(nodeIndex, true);else (0, _traverse2['default'])(_treeData).set(nodeIndex, false);

  return { treeData: _treeData };
}

var initialTreeState = {
  treeData: [],
  currentTreeNode: { title: 'not selected' }
};

function handleActions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialTreeState;
  var action = arguments[1];

  var _treeState = Object.assign({}, state);
  var treeCopy = _treeState.treeData.slice(0);
  var currentCopy = Object.assign({}, _treeState.currentTreeNode);
  switch (action.type) {
    case 'GetTreeDataDone':
      {
        if (action.data) return _gotTreeData(action.data);
        return state;
      }
    case 'SelectTreeNode':
      {
        return _selectTreeNode(treeCopy, currentCopy, action.node);
      }
    case 'SetTreeNodeClosed':
      {
        var closedTreeData = _setTreeNodeClosed(treeCopy, action.node);
        return _extends({}, state, closedTreeData);
      }
    default:
      return state;
  }
}

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTreeNode = selectTreeNode;
exports.setTreeNodeClosed = setTreeNodeClosed;
exports.getTreeDataDone = getTreeDataDone;
function selectTreeNode(node) {
  return function (dispatch, getState) {
    dispatch({ type: 'SelectTreeNode', node: node });
    dispatch({ type: 'ApiSetTreeData', data: { data: getState().treeState.treeData } });
    var currentTreeNode = getState().treeState.currentTreeNode;

    var filePath = currentTreeNode.nodeid;
    dispatch({ type: 'ApiGetFileData', data: { filePath: filePath, nodeid: currentTreeNode.nodeid } });
  };
}

function setTreeNodeClosed(node) {
  return function (dispatch, getState) {
    dispatch({ type: 'SetTreeNodeClosed', node: node });
    dispatch({ type: 'ApiSetTreeData', data: { data: getState().treeState.treeData } });
  };
}

function getTreeDataDone(data) {
  return function (dispatch, getState) {
    dispatch({ type: 'GetTreeDataDone', data: data });
    dispatch({ type: 'SelectTreeNode', node: getState().treeState.currentTreeNode });
  };
}

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getFileDataDone;
function getFileDataDone(data) {
  return { type: 'GetFileDataDone', data: data };
}

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(37);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(11);

__webpack_require__(44);

__webpack_require__(119);

__webpack_require__(120);

__webpack_require__(121);

__webpack_require__(122);

__webpack_require__(123);

__webpack_require__(124);

__webpack_require__(125);

__webpack_require__(126);

__webpack_require__(127);

var _app = __webpack_require__(128);

var _app2 = _interopRequireDefault(_app);

var _App = __webpack_require__(249);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

window.ReactDom = _reactDom2['default'];

_reactDom2['default'].render(_react2['default'].createElement(
  _reactRedux.Provider,
  { store: _App2['default'] },
  _react2['default'].createElement(_app2['default'], null)
), document.getElementById('react'));

/***/ })

},[80]);