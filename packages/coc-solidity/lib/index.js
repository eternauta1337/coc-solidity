(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const coc = __importStar(__webpack_require__(1));
const compiler_1 = __webpack_require__(2);
const compileActive_1 = __webpack_require__(3);
// Port: Hack to hook up console.log to coc.nvim's logger.
const logger = __webpack_require__(29)('workspace');
console.log = (...args) => {
    logger.info(...args);
};
let diagnosticCollection;
let compiler;
async function activate(context) {
    coc.workspace.showMessage(`coc-solidity works!`);
    console.info('>>> coc-solidity activate called');
    const ws = coc.workspace.workspaceFolders;
    diagnosticCollection = coc.languages.createDiagnosticCollection('solidity');
    compiler = new compiler_1.Compiler(context.extensionPath);
    /*
    const configuration = vscode.workspace.getConfiguration('solidity');
    const cacheConfiguration = configuration.get<string>('solcCache');
    if (typeof cacheConfiguration === 'undefined' || cacheConfiguration === null) {
        configuration.update('solcCache', context.extensionPath, vscode.ConfigurationTarget.Global);
    }*/
    /* WSL is affected by this
    workspace.onDidChangeConfiguration(async (event) => {
        if (event.affectsConfiguration('solidity.enableLocalNodeCompiler') ||
            event.affectsConfiguration('solidity.compileUsingRemoteVersion') ||
            event.affectsConfiguration('solidity.compileUsingLocalVersion')) {
            await initialiseCompiler();
        }
    });
    */
    context.subscriptions.push(diagnosticCollection);
    compileActive_1.initDiagnosticCollection(diagnosticCollection);
    context.subscriptions.push(coc.commands.registerCommand('coc-solidity.compile.active', async () => {
        coc.workspace.showMessage('coc-solidity.compile.active');
        const compiledResults = await compileActive_1.compileActiveContract(compiler);
        // autoCodeGenerateAfterCompilation(compiledResults, null, diagnosticCollection);
        // return compiledResults;
    }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.compile', () => {
    //     compileAllContracts(compiler, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenCSharpProject', (args: any[]) => {
    //     codeGenerateNethereumCQSCsharp(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.compileAndCodegenCSharpProject', async (args: any[]) => {
    //     const compiledResults = await compileActiveContract(compiler);
    //     compiledResults.forEach(file => {
    //         codeGenerateCQS(file, 0, args, diagnosticCollection);
    //     });
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenNethereumCodeGenSettings', (args: any[]) => {
    //     generateNethereumCodeSettingsFile();
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenVbNetProject', (args: any[]) => {
    //     codeGenerateNethereumCQSVbNet(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.compileAndCodegenVbNetProject', async (args: any[]) => {
    //     const compiledResults = await compileActiveContract(compiler);
    //     compiledResults.forEach(file => {
    //         codeGenerateCQS(file, 1, args, diagnosticCollection);
    //     });
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenFSharpProject', (args: any[]) => {
    //     codeGenerateNethereumCQSFSharp(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.compileAndCodegenFSharpProject', async (args: any[]) => {
    //     const compiledResults = await compileActiveContract(compiler);
    //     compiledResults.forEach(file => {
    //         codeGenerateCQS(file, 3, args, diagnosticCollection);
    //     });
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenCSharpProjectAll', (args: any[]) => {
    //     codeGenerateNethereumCQSCSharpAll(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenVbNetProjectAll', (args: any[]) => {
    //     codeGenerateNethereumCQSVbAll(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenFSharpProjectAll', (args: any[]) => {
    //     codeGenerateNethereumCQSFSharpAll(args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenCSharpProjectAllAbiCurrent', (args: any[]) => {
    //     codeGenerateAllFilesFromAbiInCurrentFolder(0, args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenVbNetProjectAllAbiCurrent', (args: any[]) => {
    //     codeGenerateAllFilesFromAbiInCurrentFolder(1, args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.codegenFSharpProjectAllAbiCurrent', (args: any[]) => {
    //     codeGenerateAllFilesFromAbiInCurrentFolder(3, args, diagnosticCollection);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.fixDocument', () => {
    //     lintAndfixCurrentDocument();
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.compilerInfo', async () => {
    //     await compiler.outputCompilerInfoEnsuringInitialised();
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.solcReleases', async () => {
    //     compiler.outputSolcReleases();
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.selectWorkspaceRemoteSolcVersion', async () => {
    //     compiler.selectRemoteVersion(vscode.ConfigurationTarget.Workspace);
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('solidity.selectGlobalRemoteSolcVersion', async () => {
    //     compiler.selectRemoteVersion(vscode.ConfigurationTarget.Global);
    // }));
    // context.subscriptions.push(
    //     vscode.languages.registerDocumentFormattingEditProvider('solidity', {
    //         provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
    //             return formatDocument(document, context);
    //         },
    //     }));
    // const serverModule = path.join(__dirname, 'server.js');
    // const serverOptions: ServerOptions = {
    //     debug: {
    //         module: serverModule,
    //         options: {
    //             execArgv: ['--nolazy', '--inspect=6009'],
    //         },
    //         transport: TransportKind.ipc,
    //     },
    //     run: {
    //         module: serverModule,
    //         transport: TransportKind.ipc,
    //     },
    // };
    // const clientOptions: LanguageClientOptions = {
    //     documentSelector: [
    //         { language: 'solidity', scheme: 'file' },
    //         { language: 'solidity', scheme: 'untitled' },
    //     ],
    //     revealOutputChannelOn: RevealOutputChannelOn.Never,
    //     synchronize: {
    //         // Synchronize the setting section 'solidity' to the server
    //         configurationSection: 'solidity',
    //         // Notify the server about file changes to '.sol.js files contain in the workspace (TODO node, linter)
    //         // fileEvents: vscode.workspace.createFileSystemWatcher('**/.sol.js'),
    //     },
    //     initializationOptions: context.extensionPath,
    // };
    // let clientDisposable;
    // if (ws) {
    //     clientDisposable = new LanguageClient(
    //         'solidity',
    //         'Solidity Language Server',
    //         serverOptions,
    //         clientOptions).start();
    // }
    // // Push the disposable to the context's subscriptions so that the
    // // client can be deactivated on extension deactivation
    // context.subscriptions.push(clientDisposable);
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const coc = __importStar(__webpack_require__(1));
class Compiler {
    constructor(solcCachePath) {
        this.solcCachePath = solcCachePath;
        this.outputChannel = coc.workspace.createOutputChannel('solidity compilation');
    }
}
exports.Compiler = Compiler;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileActiveContract = exports.initDiagnosticCollection = void 0;
const coc = __importStar(__webpack_require__(1));
const contractsCollection_1 = __webpack_require__(4);
const vscode_uri_1 = __webpack_require__(5);
const projectService_1 = __webpack_require__(6);
// import { formatPath } from './util';
let diagnosticCollection;
function initDiagnosticCollection(diagnostics) {
    diagnosticCollection = diagnostics;
}
exports.initDiagnosticCollection = initDiagnosticCollection;
async function compileActiveContract(compiler) {
    const editor = await coc.workspace.document;
    if (!editor) {
        return null; // We need something open
    }
    if (editor.filetype != 'solidity') {
        coc.workspace.showMessage('WARNING: This not a solidity file (*.sol)');
        return null;
    }
    // Check if is folder, if not stop we need to output to a bin folder on rootPath
    if (coc.workspace.workspaceFolders[0] == undefined) {
        coc.workspace.showMessage('Please open a folder in Vim as a workspace');
        return null;
    }
    const contractsCollection = new contractsCollection_1.ContractCollection();
    const contractCode = editor.content;
    const contractUri = vscode_uri_1.URI.parse(editor.uri);
    const contractPath = contractUri.fsPath;
    const packageDefaultDependenciesDirectory = coc.workspace.getConfiguration('solidity').get('packageDefaultDependenciesDirectory');
    const packageDefaultDependenciesContractsDirectory = coc.workspace.getConfiguration('solidity').get('packageDefaultDependenciesContractsDirectory');
    const compilationOptimisation = coc.workspace.getConfiguration('solidity').get('compilerOptimization');
    const projectUri = coc.workspace.workspaceFolders[0].uri;
    const projectPath = vscode_uri_1.URI.parse(projectUri).fsPath;
    const project = projectService_1.initialiseProject(projectPath, packageDefaultDependenciesDirectory, packageDefaultDependenciesContractsDirectory);
    const contract = contractsCollection.addContractAndResolveImports(contractPath, contractCode, project);
    console.log(contract); // TODO: Port point ajs
    // const packagesPath = formatPath(project.packagesDir);
    // TODO: Remove when porting continues.
    coc.workspace.showMessage('Porting compileActiveContract()...');
    // return compiler.compile(contractsCollection.getDefaultContractsForCompilation(compilationOptimisation),
    //         diagnosticCollection,
    //         project.projectPackage.build_dir,
    //         project.projectPackage.absoluletPath,
    //         null,
    //         packagesPath,
    //         contract.absolutePath);
    // TODO: Remove after returning something real.
    return new Promise(res => { res([]); });
}
exports.compileActiveContract = compileActiveContract;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCollection = void 0;
const fs = __importStar(__webpack_require__(7));
const contract_1 = __webpack_require__(119);
const util_1 = __webpack_require__(120);
class ContractCollection {
    constructor() {
        this.contracts = new Array();
    }
    //     public findContract(contract: Contract, contractPath: string) {
    //         return contract.absolutePath === contractPath;
    //     }
    containsContract(contractPath) {
        return this.contracts.findIndex((contract) => { return contract.absolutePath === contractPath; }) > -1;
    }
    //     public getDefaultContractsForCompilation(optimizeCompilationRuns = 200) {
    //         const compilerOutputSelection = {
    //             '*': {
    //                 '': ['ast'],
    //                 '*': ['abi', 'devdoc', 'userdoc', 'metadata', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates'],
    //             },
    //         };
    //         return this.getContractsForCompilation(true, optimizeCompilationRuns, compilerOutputSelection);
    //     }
    //     public getDefaultContractsForCompilationDiagnostics() {
    //         const compilerOutputSelection = {
    //             '*': {
    //                 '': [],
    //                 '*': [],
    //             },
    //         };
    //         return this.getContractsForCompilation(false, 0, compilerOutputSelection);
    //     }
    //     public getContractsForCompilation(optimizeCompilation: boolean, optimizeCompilationRuns: number, outputSelection) {
    //         const contractsForCompilation = {};
    //         this.contracts.forEach(contract => {
    //             contractsForCompilation[contract.absolutePath] = {content: contract.code};
    //         });
    //         const compilation = {
    //             language: 'Solidity',
    //             settings:
    //             {
    //                 optimizer: {
    //                     enabled: optimizeCompilation,
    //                     runs: optimizeCompilationRuns,
    //                 },
    //                 outputSelection: outputSelection,
    //             },
    //             sources : contractsForCompilation,
    //         };
    //         return compilation;
    //     }
    addContractAndResolveImports(contractPath, code, project) {
        const contract = this.addContract(contractPath, code);
        if (contract !== null) {
            contract.resolveImports();
            console.log('contract imports', contract.imports); // TODO: Port point ajs
            contract.imports.forEach(foundImport => {
                if (fs.existsSync(foundImport)) {
                    if (!this.containsContract(foundImport)) {
                        const importContractCode = this.readContractCode(foundImport);
                        if (importContractCode != null) {
                            this.addContractAndResolveImports(foundImport, importContractCode, project);
                        }
                    }
                }
                else {
                    this.addContractAndResolveDependencyImport(foundImport, contract, project);
                }
            });
        }
        return contract;
    }
    addContract(contractPath, code) {
        if (!this.containsContract(contractPath)) {
            const contract = new contract_1.Contract(contractPath, code);
            this.contracts.push(contract);
            return contract;
        }
        return null;
    }
    formatContractPath(contractPath) {
        return util_1.formatPath(contractPath);
    }
    //     private getAllImportFromPackages() {
    //         const importsFromPackages = new Array<string>();
    //         this.contracts.forEach(contract => {
    //             const contractImports = contract.getAllImportFromPackages();
    //             contractImports.forEach(contractImport => {
    //                 if (importsFromPackages.indexOf(contractImport) < 0) {
    //                     importsFromPackages.push(contractImport);
    //                 }
    //             });
    //         });
    //         return importsFromPackages;
    //     }
    readContractCode(contractPath) {
        if (fs.existsSync(contractPath)) {
            return fs.readFileSync(contractPath, 'utf8');
        }
        return null;
    }
    addContractAndResolveDependencyImport(dependencyImport, contract, project) {
        const depPack = project.findPackage(dependencyImport);
        if (depPack !== undefined) {
            const depImportPath = this.formatContractPath(depPack.resolveImport(dependencyImport));
            if (!this.containsContract(depImportPath)) {
                const importContractCode = this.readContractCode(depImportPath);
                if (importContractCode != null) {
                    this.addContractAndResolveImports(depImportPath, importContractCode, project);
                    contract.replaceDependencyPath(dependencyImport, depImportPath);
                }
            }
            else {
                contract.replaceDependencyPath(dependencyImport, depImportPath);
            }
        }
    }
}
exports.ContractCollection = ContractCollection;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URI", function() { return URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uriToFsPath", function() { return uriToFsPath; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var isWindows;
if (typeof process === 'object') {
    isWindows = process.platform === 'win32';
}
else if (typeof navigator === 'object') {
    var userAgent = navigator.userAgent;
    isWindows = userAgent.indexOf('Windows') >= 0;
}
function isHighSurrogate(charCode) {
    return (0xD800 <= charCode && charCode <= 0xDBFF);
}
function isLowSurrogate(charCode) {
    return (0xDC00 <= charCode && charCode <= 0xDFFF);
}
function isLowerAsciiHex(code) {
    return code >= 97 /* a */ && code <= 102 /* f */;
}
function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
}
function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
}
function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}
//#endregion
var _schemePattern = /^\w[\w\d+.-]*$/;
var _singleSlashStart = /^\//;
var _doubleSlashStart = /^\/\//;
function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) {
        throw new Error("[UriError]: Scheme is missing: {scheme: \"\", authority: \"" + ret.authority + "\", path: \"" + ret.path + "\", query: \"" + ret.query + "\", fragment: \"" + ret.fragment + "\"}");
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning
function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
        return 'file';
    }
    return scheme;
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
var _empty = '';
var _slash = '/';
var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 * ```txt
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 * ```
 */
var URI = /** @class */ (function () {
    /**
     * @internal
     */
    function URI(schemeOrData, authority, path, query, fragment, _strict) {
        if (_strict === void 0) { _strict = false; }
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = _schemeFix(schemeOrData, _strict);
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this, _strict);
        }
    }
    URI.isUri = function (thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string'
            && typeof thing.fragment === 'string'
            && typeof thing.path === 'string'
            && typeof thing.query === 'string'
            && typeof thing.scheme === 'string'
            && typeof thing.fsPath === 'function'
            && typeof thing.with === 'function'
            && typeof thing.toString === 'function';
    };
    Object.defineProperty(URI.prototype, "fsPath", {
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
         * platform specific path separator.
         *
         * * Will *not* validate the path for invalid characters and semantics.
         * * Will *not* look at the scheme of this URI.
         * * The result shall *not* be used for display purposes but for accessing a file on disk.
         *
         *
         * The *difference* to `URI#path` is the use of the platform specific separator and the handling
         * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
         *
         * ```ts
            const u = URI.parse('file://server/c$/folder/file.txt')
            u.authority === 'server'
            u.path === '/shares/c$/file.txt'
            u.fsPath === '\\server\c$\folder\file.txt'
        ```
         *
         * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
         * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
         * with URIs that represent files on disk (`file` scheme).
         */
        get: function () {
            // if (this.scheme !== 'file') {
            // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
            // }
            return uriToFsPath(this, false);
        },
        enumerable: true,
        configurable: true
    });
    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
        if (!change) {
            return this;
        }
        var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
        if (scheme === undefined) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === undefined) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === undefined) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === undefined) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === undefined) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new _URI(scheme, authority, path, query, fragment);
    };
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    URI.parse = function (value, _strict) {
        if (_strict === void 0) { _strict = false; }
        var match = _regexp.exec(value);
        if (!match) {
            return new _URI(_empty, _empty, _empty, _empty, _empty);
        }
        return new _URI(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
    };
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    URI.file = function (path) {
        var authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            var idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new _URI('file', authority, path, _empty, _empty);
    };
    URI.from = function (components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };
    // /**
    //  * Join a URI path with path fragments and normalizes the resulting path.
    //  *
    //  * @param uri The input URI.
    //  * @param pathFragment The path fragment to add to the URI path.
    //  * @returns The resulting URI.
    //  */
    // static joinPath(uri: URI, ...pathFragment: string[]): URI {
    // 	if (!uri.path) {
    // 		throw new Error(`[UriError]: cannot call joinPaths on URI without path`);
    // 	}
    // 	let newPath: string;
    // 	if (isWindows && uri.scheme === 'file') {
    // 		newPath = URI.file(paths.win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
    // 	} else {
    // 		newPath = paths.posix.join(uri.path, ...pathFragment);
    // 	}
    // 	return uri.with({ path: newPath });
    // }
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        return _asFormatted(this, skipEncoding);
    };
    URI.prototype.toJSON = function () {
        return this;
    };
    URI.revive = function (data) {
        if (!data) {
            return data;
        }
        else if (data instanceof URI) {
            return data;
        }
        else {
            var result = new _URI(data);
            result._formatted = data.external;
            result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
            return result;
        }
    };
    return URI;
}());

var _pathSepMarker = isWindows ? 1 : undefined;
// eslint-disable-next-line @typescript-eslint/class-name-casing
var _URI = /** @class */ (function (_super) {
    __extends(_URI, _super);
    function _URI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._formatted = null;
        _this._fsPath = null;
        return _this;
    }
    Object.defineProperty(_URI.prototype, "fsPath", {
        get: function () {
            if (!this._fsPath) {
                this._fsPath = uriToFsPath(this, false);
            }
            return this._fsPath;
        },
        enumerable: true,
        configurable: true
    });
    _URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) { skipEncoding = false; }
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    };
    _URI.prototype.toJSON = function () {
        var res = {
            $mid: 1
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
            res._sep = _pathSepMarker;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        // uri components
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    };
    return _URI;
}(URI));
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
var encodeTable = (_a = {},
    _a[58 /* Colon */] = '%3A',
    _a[47 /* Slash */] = '%2F',
    _a[63 /* QuestionMark */] = '%3F',
    _a[35 /* Hash */] = '%23',
    _a[91 /* OpenSquareBracket */] = '%5B',
    _a[93 /* CloseSquareBracket */] = '%5D',
    _a[64 /* AtSign */] = '%40',
    _a[33 /* ExclamationMark */] = '%21',
    _a[36 /* DollarSign */] = '%24',
    _a[38 /* Ampersand */] = '%26',
    _a[39 /* SingleQuote */] = '%27',
    _a[40 /* OpenParen */] = '%28',
    _a[41 /* CloseParen */] = '%29',
    _a[42 /* Asterisk */] = '%2A',
    _a[43 /* Plus */] = '%2B',
    _a[44 /* Comma */] = '%2C',
    _a[59 /* Semicolon */] = '%3B',
    _a[61 /* Equals */] = '%3D',
    _a[32 /* Space */] = '%20',
    _a);
function encodeURIComponentFast(uriComponent, allowSlash) {
    var res = undefined;
    var nativeEncodePos = -1;
    for (var pos = 0; pos < uriComponent.length; pos++) {
        var code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= 97 /* a */ && code <= 122 /* z */)
            || (code >= 65 /* A */ && code <= 90 /* Z */)
            || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
            || code === 45 /* Dash */
            || code === 46 /* Period */
            || code === 95 /* Underline */
            || code === 126 /* Tilde */
            || (allowSlash && code === 47 /* Slash */)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            var escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
function encodeURIComponentMinimal(path) {
    var res = undefined;
    for (var pos = 0; pos < path.length; pos++) {
        var code = path.charCodeAt(pos);
        if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 */
function uriToFsPath(uri, keepDriveLetterCasing) {
    var value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = "//" + uri.authority + uri.path;
    }
    else if (uri.path.charCodeAt(0) === 47 /* Slash */
        && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
        && uri.path.charCodeAt(2) === 58 /* Colon */) {
        if (!keepDriveLetterCasing) {
            // windows drive letter: file:///c:/far/boo
            value = uri.path[1].toLowerCase() + uri.path.substr(2);
        }
        else {
            value = uri.path.substr(1);
        }
    }
    else {
        // other path
        value = uri.path;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    var res = '';
    var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        var idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            var userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(':');
        if (idx === -1) {
            res += encoder(authority, false);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
            var code = path.charCodeAt(1);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
            var code = path.charCodeAt(0);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true);
    }
    if (query) {
        res += '?';
        res += encoder(query, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
}
// --- decode
function decodeURIComponentGraceful(str) {
    try {
        return decodeURIComponent(str);
    }
    catch (_a) {
        if (str.length > 3) {
            return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
        }
        else {
            return str;
        }
    }
}
var _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function percentDecode(str) {
    if (!str.match(_rEncodedAsHex)) {
        return str;
    }
    return str.replace(_rEncodedAsHex, function (match) { return decodeURIComponentGraceful(match); });
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseProject = void 0;
const fs = __importStar(__webpack_require__(7));
const path = __importStar(__webpack_require__(8));
const yaml = __importStar(__webpack_require__(9));
const package_1 = __webpack_require__(27);
const project_1 = __webpack_require__(28);
// TODO: These are temporary constants until standard agreed
// A project standard is needed so each project can define where it store its project dependencies
// and if are relative or at project source
// also versioning (as it was defined years ago)
const packageConfigFileName = 'dappFile';
// These are set using user configuration settings
let packageDependenciesDirectory = 'lib';
let packageDependenciesContractsDirectory = 'src';
function createPackage(rootPath) {
    const projectPackageFile = path.join(rootPath, packageConfigFileName);
    if (fs.existsSync(projectPackageFile)) {
        // TODO: automapper
        const packageConfig = readYamlSync(projectPackageFile);
        // TODO: throw expection / warn user of invalid package file
        const projectPackage = new package_1.Package(packageDependenciesContractsDirectory);
        projectPackage.absoluletPath = rootPath;
        if (packageConfig) {
            if (packageConfig.layout !== undefined) {
                if (projectPackage.build_dir !== undefined) {
                    projectPackage.build_dir = packageConfig.layout.build_dir;
                }
                if (projectPackage.sol_sources !== undefined) {
                    projectPackage.sol_sources = packageConfig.layout.sol_sources;
                }
            }
            if (projectPackage.name !== undefined) {
                projectPackage.name = packageConfig.name;
            }
            else {
                projectPackage.name = path.basename(rootPath);
            }
            if (projectPackage.version !== undefined) {
                projectPackage.version = packageConfig.name;
            }
            if (projectPackage.dependencies !== undefined) {
                projectPackage.dependencies = packageConfig.dependencies;
            }
        }
        return projectPackage;
    }
    return null;
}
function readYamlSync(filePath) {
    const fileContent = fs.readFileSync(filePath);
    return yaml.load(fileContent);
}
function initialiseProject(rootPath, packageDefaultDependenciesDirectory, packageDefaultDependenciesContractsDirectory) {
    packageDependenciesDirectory = packageDefaultDependenciesDirectory;
    packageDependenciesContractsDirectory = packageDefaultDependenciesContractsDirectory;
    const projectPackage = createProjectPackage(rootPath);
    const dependencies = loadDependencies(rootPath, projectPackage);
    const packagesDirAbsolutePath = path.join(rootPath, packageDependenciesDirectory);
    return new project_1.Project(projectPackage, dependencies, packagesDirAbsolutePath);
}
exports.initialiseProject = initialiseProject;
function loadDependencies(rootPath, projectPackage, depPackages = new Array()) {
    if (projectPackage.dependencies !== undefined) {
        Object.keys(projectPackage.dependencies).forEach(dependency => {
            if (!depPackages.some((existingDepPack) => existingDepPack.name === dependency)) {
                const depPackageDependencyPath = path.join(rootPath, packageDependenciesDirectory, dependency);
                const depPackage = createPackage(depPackageDependencyPath);
                if (depPackage !== null) {
                    depPackages.push(depPackage);
                    // Assumed the package manager will install all the dependencies at root so adding all the existing ones
                    loadDependencies(rootPath, depPackage, depPackages);
                }
                else {
                    // should warn user of a package dependency missing
                }
            }
        });
    }
    // lets not skip packages in lib
    const depPackagePath = path.join(projectPackage.absoluletPath, packageDependenciesDirectory);
    if (fs.existsSync(depPackagePath)) {
        const depPackagesDirectories = getDirectories(depPackagePath);
        depPackagesDirectories.forEach(depPackageDir => {
            const fullPath = path.join(depPackagePath, depPackageDir);
            let depPackage = createPackage(fullPath);
            if (depPackage == null) {
                depPackage = createDefaultPackage(fullPath);
            }
            if (!depPackages.some((existingDepPack) => existingDepPack.name === depPackage.name)) {
                depPackages.push(depPackage);
                loadDependencies(rootPath, depPackage, depPackages);
            }
        });
    }
    return depPackages;
}
function getDirectories(dirPath) {
    return fs.readdirSync(dirPath).filter(function (file) {
        const subdirPath = path.join(dirPath, file);
        return fs.statSync(subdirPath).isDirectory();
    });
}
function createDefaultPackage(packagePath) {
    const defaultPackage = new package_1.Package(packageDependenciesContractsDirectory);
    defaultPackage.absoluletPath = packagePath;
    defaultPackage.name = path.basename(packagePath);
    return defaultPackage;
}
function createProjectPackage(rootPath) {
    let projectPackage = createPackage(rootPath);
    // Default project package,this could be passed as a function
    if (projectPackage === null) {
        projectPackage = createDefaultPackage(rootPath);
    }
    return projectPackage;
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var composer, constructor, dumper, errors, events, loader, nodes, parser, reader, resolver, scanner, tokens, util;

  composer = this.composer = __webpack_require__(10);

  constructor = this.constructor = __webpack_require__(14);

  dumper = this.dumper = __webpack_require__(17);

  errors = this.errors = __webpack_require__(12);

  events = this.events = __webpack_require__(11);

  loader = this.loader = __webpack_require__(22);

  nodes = this.nodes = __webpack_require__(13);

  parser = this.parser = __webpack_require__(26);

  reader = this.reader = __webpack_require__(23);

  resolver = this.resolver = __webpack_require__(21);

  scanner = this.scanner = __webpack_require__(24);

  tokens = this.tokens = __webpack_require__(25);

  util = __webpack_require__(15);


  /*
  Scan a YAML stream and produce scanning tokens.
   */

  this.scan = function(stream, Loader) {
    var _loader, results;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_token()) {
      results.push(_loader.get_token());
    }
    return results;
  };


  /*
  Parse a YAML stream and produce parsing events.
   */

  this.parse = function(stream, Loader) {
    var _loader, results;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_event()) {
      results.push(_loader.get_event());
    }
    return results;
  };


  /*
  Parse the first YAML document in a stream and produce the corresponding
  representation tree.
   */

  this.compose = function(stream, Loader) {
    var _loader;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    return _loader.get_single_node();
  };


  /*
  Parse all YAML documents in a stream and produce corresponding representation
  trees.
   */

  this.compose_all = function(stream, Loader) {
    var _loader, results;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_node()) {
      results.push(_loader.get_node());
    }
    return results;
  };


  /*
  Parse the first YAML document in a stream and produce the corresponding
  Javascript object.
   */

  this.load = function(stream, Loader) {
    var _loader;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    return _loader.get_single_data();
  };


  /*
  Parse all YAML documents in a stream and produce the corresponing Javascript
  object.
   */

  this.load_all = function(stream, Loader) {
    var _loader, results;
    if (Loader == null) {
      Loader = loader.Loader;
    }
    _loader = new Loader(stream);
    results = [];
    while (_loader.check_data()) {
      results.push(_loader.get_data());
    }
    return results;
  };


  /*
  Emit YAML parsing events into a stream.
  If stream is falsey, return the produced string instead.
   */

  this.emit = function(events, stream, Dumper, options) {
    var _dumper, dest, event, i, len;
    if (Dumper == null) {
      Dumper = dumper.Dumper;
    }
    if (options == null) {
      options = {};
    }
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      for (i = 0, len = events.length; i < len; i++) {
        event = events[i];
        _dumper.emit(event);
      }
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };


  /*
  Serialize a representation tree into a YAML stream.
  If stream is falsey, return the produced string instead.
   */

  this.serialize = function(node, stream, Dumper, options) {
    if (Dumper == null) {
      Dumper = dumper.Dumper;
    }
    if (options == null) {
      options = {};
    }
    return exports.serialize_all([node], stream, Dumper, options);
  };


  /*
  Serialize a sequence of representation tress into a YAML stream.
  If stream is falsey, return the produced string instead.
   */

  this.serialize_all = function(nodes, stream, Dumper, options) {
    var _dumper, dest, i, len, node;
    if (Dumper == null) {
      Dumper = dumper.Dumper;
    }
    if (options == null) {
      options = {};
    }
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      _dumper.open();
      for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        _dumper.serialize(node);
      }
      _dumper.close();
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };


  /*
  Serialize a Javascript object into a YAML stream.
  If stream is falsey, return the produced string instead.
   */

  this.dump = function(data, stream, Dumper, options) {
    if (Dumper == null) {
      Dumper = dumper.Dumper;
    }
    if (options == null) {
      options = {};
    }
    return exports.dump_all([data], stream, Dumper, options);
  };


  /*
  Serialize a sequence of Javascript objects into a YAML stream.
  If stream is falsey, return the produced string instead.
   */

  this.dump_all = function(documents, stream, Dumper, options) {
    var _dumper, dest, document, i, len;
    if (Dumper == null) {
      Dumper = dumper.Dumper;
    }
    if (options == null) {
      options = {};
    }
    dest = stream || new util.StringStream;
    _dumper = new Dumper(dest, options);
    try {
      _dumper.open();
      for (i = 0, len = documents.length; i < len; i++) {
        document = documents[i];
        _dumper.represent(document);
      }
      _dumper.close();
    } finally {
      _dumper.dispose();
    }
    return stream || dest.string;
  };

}).call(this);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, events, nodes,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  events = __webpack_require__(11);

  MarkedYAMLError = __webpack_require__(12).MarkedYAMLError;

  nodes = __webpack_require__(13);


  /*
  Thrown for errors encountered during composing.
   */

  this.ComposerError = (function(superClass) {
    extend(ComposerError, superClass);

    function ComposerError() {
      return ComposerError.__super__.constructor.apply(this, arguments);
    }

    return ComposerError;

  })(MarkedYAMLError);


  /*
  The composer class handles the construction of representation trees from events.
  
  This uses the methods from {Parser} to process the event stream, and provides a similar stream-like
  interface to representation trees via {Composer#check_node}, {Composer#get_node}, and
  {Composer#get_single_node}.
   */

  this.Composer = (function() {

    /*
    Construct a new `Composer` instance.
     */
    function Composer() {
      this.anchors = {};
    }


    /*
    Checks if a document can be composed from the event stream.
    
    So long as the event stream hasn't ended (no [StreamEndEvent]), another document can be composed.
    
    @return {Boolean} True if a document can be composed, false otherwise.
     */

    Composer.prototype.check_node = function() {
      if (this.check_event(events.StreamStartEvent)) {
        this.get_event();
      }
      return !this.check_event(events.StreamEndEvent);
    };


    /*
    Compose a document from the remaining event stream.
    
    {Composer#check_node} must be called before calling this method.
    
    @return {Node} The next document in the stream. Returns `undefined` if the event stream has ended.
     */

    Composer.prototype.get_node = function() {
      if (!this.check_event(events.StreamEndEvent)) {
        return this.compose_document();
      }
    };


    /*
    Compose a single document from the entire event stream.
    
    @throw {ComposerError} if there's more than one document is in the stream.
    
    @return {Node} The single document in the stream.
     */

    Composer.prototype.get_single_node = function() {
      var document, event;
      this.get_event();
      document = null;
      if (!this.check_event(events.StreamEndEvent)) {
        document = this.compose_document();
      }
      if (!this.check_event(events.StreamEndEvent)) {
        event = this.get_event();
        throw new exports.ComposerError('expected a single document in the stream', document.start_mark, 'but found another document', event.start_mark);
      }
      this.get_event();
      return document;
    };


    /*
    Compose a document node from the event stream.
    
    A 'document' node is any single {Node} subclass.  {DocumentStart} and {DocumentEnd} events delimit
    the events used for composition.
    
    @private
    
    @return {Node} The document node.
     */

    Composer.prototype.compose_document = function() {
      var node;
      this.get_event();
      node = this.compose_node();
      this.get_event();
      this.anchors = {};
      return node;
    };


    /*
    Compose a node from the event stream.
    
    Composes a {ScalarNode}, {SequenceNode}, or {MappingNode} from the event stream, depending on the
    first event encountered ({ScalarEvent}, {SequenceStartEvent}, or {MappingStartEvent}
    respectively).
    
    @private
    
    @param parent {Node} The parent of the new node.
    @param index {Number} The index of the new node within the parent's children.
    @throw {ComposerError} if an alias is encountered for an undefined anchor.
    @throw {ComposerError} if a duplicate anchor is envountered.
    @return {Node} The composed node.
     */

    Composer.prototype.compose_node = function(parent, index) {
      var anchor, event, node;
      if (this.check_event(events.AliasEvent)) {
        event = this.get_event();
        anchor = event.anchor;
        if (!(anchor in this.anchors)) {
          throw new exports.ComposerError(null, null, "found undefined alias " + anchor, event.start_mark);
        }
        return this.anchors[anchor];
      }
      event = this.peek_event();
      anchor = event.anchor;
      if (anchor !== null && anchor in this.anchors) {
        throw new exports.ComposerError("found duplicate anchor " + anchor + "; first occurence", this.anchors[anchor].start_mark, 'second occurrence', event.start_mark);
      }
      this.descend_resolver(parent, index);
      if (this.check_event(events.ScalarEvent)) {
        node = this.compose_scalar_node(anchor);
      } else if (this.check_event(events.SequenceStartEvent)) {
        node = this.compose_sequence_node(anchor);
      } else if (this.check_event(events.MappingStartEvent)) {
        node = this.compose_mapping_node(anchor);
      }
      this.ascend_resolver();
      return node;
    };


    /*
    Compose a {ScalarNode} from the event stream.
    
    @private
    
    @param anchor {String} The anchor name for the node (if any).
    @return {ScalarNode} The node composed from a {ScalarEvent}.
     */

    Composer.prototype.compose_scalar_node = function(anchor) {
      var event, node, tag;
      event = this.get_event();
      tag = event.tag;
      if (tag === null || tag === '!') {
        tag = this.resolve(nodes.ScalarNode, event.value, event.implicit);
      }
      node = new nodes.ScalarNode(tag, event.value, event.start_mark, event.end_mark, event.style);
      if (anchor !== null) {
        this.anchors[anchor] = node;
      }
      return node;
    };


    /*
    Compose a {SequenceNode} from the event stream.
    
    The contents of the node are composed from events between a {SequenceStartEvent} and a
    {SequenceEndEvent}.
    
    @private
    
    @param anchor {String} The anchor name for the node (if any).
    @return {SequenceNode} The composed node.
     */

    Composer.prototype.compose_sequence_node = function(anchor) {
      var end_event, index, node, start_event, tag;
      start_event = this.get_event();
      tag = start_event.tag;
      if (tag === null || tag === '!') {
        tag = this.resolve(nodes.SequenceNode, null, start_event.implicit);
      }
      node = new nodes.SequenceNode(tag, [], start_event.start_mark, null, start_event.flow_style);
      if (anchor !== null) {
        this.anchors[anchor] = node;
      }
      index = 0;
      while (!this.check_event(events.SequenceEndEvent)) {
        node.value.push(this.compose_node(node, index));
        index++;
      }
      end_event = this.get_event();
      node.end_mark = end_event.end_mark;
      return node;
    };


    /*
    Compose a {MappingNode} from the event stream.
    
    The contents of the node are composed from events between a {MappingStartEvent} and a
    {MappingEndEvent}.
    
    @private
    
    @param anchor {String} The anchor name for the node (if any).
    @return {MappingNode} The composed node.
     */

    Composer.prototype.compose_mapping_node = function(anchor) {
      var end_event, item_key, item_value, node, start_event, tag;
      start_event = this.get_event();
      tag = start_event.tag;
      if (tag === null || tag === '!') {
        tag = this.resolve(nodes.MappingNode, null, start_event.implicit);
      }
      node = new nodes.MappingNode(tag, [], start_event.start_mark, null, start_event.flow_style);
      if (anchor !== null) {
        this.anchors[anchor] = node;
      }
      while (!this.check_event(events.MappingEndEvent)) {
        item_key = this.compose_node(node);
        item_value = this.compose_node(node, item_key);
        node.value.push([item_key, item_value]);
      }
      end_event = this.get_event();
      node.end_mark = end_event.end_mark;
      return node;
    };

    return Composer;

  })();

}).call(this);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Event = (function() {
    function Event(start_mark, end_mark) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return Event;

  })();

  this.NodeEvent = (function(superClass) {
    extend(NodeEvent, superClass);

    function NodeEvent(anchor, start_mark, end_mark) {
      this.anchor = anchor;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return NodeEvent;

  })(this.Event);

  this.CollectionStartEvent = (function(superClass) {
    extend(CollectionStartEvent, superClass);

    function CollectionStartEvent(anchor, tag, implicit, start_mark, end_mark, flow_style) {
      this.anchor = anchor;
      this.tag = tag;
      this.implicit = implicit;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.flow_style = flow_style;
    }

    return CollectionStartEvent;

  })(this.NodeEvent);

  this.CollectionEndEvent = (function(superClass) {
    extend(CollectionEndEvent, superClass);

    function CollectionEndEvent() {
      return CollectionEndEvent.__super__.constructor.apply(this, arguments);
    }

    return CollectionEndEvent;

  })(this.Event);

  this.StreamStartEvent = (function(superClass) {
    extend(StreamStartEvent, superClass);

    function StreamStartEvent(start_mark, end_mark, encoding) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.encoding = encoding;
    }

    return StreamStartEvent;

  })(this.Event);

  this.StreamEndEvent = (function(superClass) {
    extend(StreamEndEvent, superClass);

    function StreamEndEvent() {
      return StreamEndEvent.__super__.constructor.apply(this, arguments);
    }

    return StreamEndEvent;

  })(this.Event);

  this.DocumentStartEvent = (function(superClass) {
    extend(DocumentStartEvent, superClass);

    function DocumentStartEvent(start_mark, end_mark, explicit, version, tags) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.explicit = explicit;
      this.version = version;
      this.tags = tags;
    }

    return DocumentStartEvent;

  })(this.Event);

  this.DocumentEndEvent = (function(superClass) {
    extend(DocumentEndEvent, superClass);

    function DocumentEndEvent(start_mark, end_mark, explicit) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.explicit = explicit;
    }

    return DocumentEndEvent;

  })(this.Event);

  this.AliasEvent = (function(superClass) {
    extend(AliasEvent, superClass);

    function AliasEvent() {
      return AliasEvent.__super__.constructor.apply(this, arguments);
    }

    return AliasEvent;

  })(this.NodeEvent);

  this.ScalarEvent = (function(superClass) {
    extend(ScalarEvent, superClass);

    function ScalarEvent(anchor, tag, implicit, value, start_mark, end_mark, style) {
      this.anchor = anchor;
      this.tag = tag;
      this.implicit = implicit;
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.style = style;
    }

    return ScalarEvent;

  })(this.NodeEvent);

  this.SequenceStartEvent = (function(superClass) {
    extend(SequenceStartEvent, superClass);

    function SequenceStartEvent() {
      return SequenceStartEvent.__super__.constructor.apply(this, arguments);
    }

    return SequenceStartEvent;

  })(this.CollectionStartEvent);

  this.SequenceEndEvent = (function(superClass) {
    extend(SequenceEndEvent, superClass);

    function SequenceEndEvent() {
      return SequenceEndEvent.__super__.constructor.apply(this, arguments);
    }

    return SequenceEndEvent;

  })(this.CollectionEndEvent);

  this.MappingStartEvent = (function(superClass) {
    extend(MappingStartEvent, superClass);

    function MappingStartEvent() {
      return MappingStartEvent.__super__.constructor.apply(this, arguments);
    }

    return MappingStartEvent;

  })(this.CollectionStartEvent);

  this.MappingEndEvent = (function(superClass) {
    extend(MappingEndEvent, superClass);

    function MappingEndEvent() {
      return MappingEndEvent.__super__.constructor.apply(this, arguments);
    }

    return MappingEndEvent;

  })(this.CollectionEndEvent);

}).call(this);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Mark = (function() {
    function Mark(line, column, buffer, pointer) {
      this.line = line;
      this.column = column;
      this.buffer = buffer;
      this.pointer = pointer;
    }

    Mark.prototype.get_snippet = function(indent, max_length) {
      var break_chars, end, head, ref, ref1, start, tail;
      if (indent == null) {
        indent = 4;
      }
      if (max_length == null) {
        max_length = 75;
      }
      if (this.buffer == null) {
        return null;
      }
      break_chars = '\x00\r\n\x85\u2028\u2029';
      head = '';
      start = this.pointer;
      while (start > 0 && (ref = this.buffer[start - 1], indexOf.call(break_chars, ref) < 0)) {
        start--;
        if (this.pointer - start > max_length / 2 - 1) {
          head = ' ... ';
          start += 5;
          break;
        }
      }
      tail = '';
      end = this.pointer;
      while (end < this.buffer.length && (ref1 = this.buffer[end], indexOf.call(break_chars, ref1) < 0)) {
        end++;
        if (end - this.pointer > max_length / 2 - 1) {
          tail = ' ... ';
          end -= 5;
          break;
        }
      }
      return "" + ((new Array(indent)).join(' ')) + head + this.buffer.slice(start, end) + tail + "\n" + ((new Array(indent + this.pointer - start + head.length)).join(' ')) + "^";
    };

    Mark.prototype.toString = function() {
      var snippet, where;
      snippet = this.get_snippet();
      where = "  on line " + (this.line + 1) + ", column " + (this.column + 1);
      if (snippet) {
        return where;
      } else {
        return where + ":\n" + snippet;
      }
    };

    return Mark;

  })();

  this.YAMLError = (function(superClass) {
    extend(YAMLError, superClass);

    function YAMLError(message) {
      this.message = message;
      YAMLError.__super__.constructor.call(this);
      this.stack = this.toString() + '\n' + (new Error).stack.split('\n').slice(1).join('\n');
    }

    YAMLError.prototype.toString = function() {
      return this.message;
    };

    return YAMLError;

  })(Error);

  this.MarkedYAMLError = (function(superClass) {
    extend(MarkedYAMLError, superClass);

    function MarkedYAMLError(context, context_mark, problem, problem_mark, note) {
      this.context = context;
      this.context_mark = context_mark;
      this.problem = problem;
      this.problem_mark = problem_mark;
      this.note = note;
      MarkedYAMLError.__super__.constructor.call(this);
    }

    MarkedYAMLError.prototype.toString = function() {
      var lines;
      lines = [];
      if (this.context != null) {
        lines.push(this.context);
      }
      if ((this.context_mark != null) && ((this.problem == null) || (this.problem_mark == null) || this.context_mark.line !== this.problem_mark.line || this.context_mark.column !== this.problem_mark.column)) {
        lines.push(this.context_mark.toString());
      }
      if (this.problem != null) {
        lines.push(this.problem);
      }
      if (this.problem_mark != null) {
        lines.push(this.problem_mark.toString());
      }
      if (this.note != null) {
        lines.push(this.note);
      }
      return lines.join('\n');
    };

    return MarkedYAMLError;

  })(this.YAMLError);

}).call(this);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

(function() {
  var unique_id,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  unique_id = 0;

  this.Node = (function() {
    function Node(tag, value, start_mark, end_mark) {
      this.tag = tag;
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.unique_id = "node_" + (unique_id++);
    }

    return Node;

  })();

  this.ScalarNode = (function(superClass) {
    extend(ScalarNode, superClass);

    ScalarNode.prototype.id = 'scalar';

    function ScalarNode(tag, value, start_mark, end_mark, style) {
      this.tag = tag;
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.style = style;
      ScalarNode.__super__.constructor.apply(this, arguments);
    }

    return ScalarNode;

  })(this.Node);

  this.CollectionNode = (function(superClass) {
    extend(CollectionNode, superClass);

    function CollectionNode(tag, value, start_mark, end_mark, flow_style) {
      this.tag = tag;
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.flow_style = flow_style;
      CollectionNode.__super__.constructor.apply(this, arguments);
    }

    return CollectionNode;

  })(this.Node);

  this.SequenceNode = (function(superClass) {
    extend(SequenceNode, superClass);

    function SequenceNode() {
      return SequenceNode.__super__.constructor.apply(this, arguments);
    }

    SequenceNode.prototype.id = 'sequence';

    return SequenceNode;

  })(this.CollectionNode);

  this.MappingNode = (function(superClass) {
    extend(MappingNode, superClass);

    function MappingNode() {
      return MappingNode.__super__.constructor.apply(this, arguments);
    }

    MappingNode.prototype.id = 'mapping';

    return MappingNode;

  })(this.CollectionNode);

}).call(this);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, nodes, util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  MarkedYAMLError = __webpack_require__(12).MarkedYAMLError;

  nodes = __webpack_require__(13);

  util = __webpack_require__(15);


  /*
  Thrown for errors encountered during construction.
   */

  this.ConstructorError = (function(superClass) {
    extend(ConstructorError, superClass);

    function ConstructorError() {
      return ConstructorError.__super__.constructor.apply(this, arguments);
    }

    return ConstructorError;

  })(MarkedYAMLError);


  /*
  The constructor class handles the construction of Javascript objects from representation trees
  ({Node}s).
  
  This uses the methods from {Composer} to process the representation stream, and provides a similar
  stream-like interface to Javascript objects via {BaseConstructor#check_node},
  {BaseConstructor#get_node}, and {BaseConstructor#get_single_node}.
   */

  this.BaseConstructor = (function() {

    /*
    @property {Object} A map from a YAML tag to a constructor function for data with that tag.
    @private
     */
    BaseConstructor.prototype.yaml_constructors = {};


    /*
    @property {Object} A map from a YAML tag prefix to a constructor function for data with that tag
                       prefix.
    @private
     */

    BaseConstructor.prototype.yaml_multi_constructors = {};


    /*
    Add a constructor function for a specific tag.
    
    The constructor will be used to turn {Node Nodes} with the given tag into a Javascript object.
    
    @param tag {String} The tag for which the constructor should apply.
    @param constructor {Function<Node,any>} A function that turns a {Node} with the given tag into a
      Javascript object.
    @return {Function<Node,Any>} Returns the supplied `constructor`.
     */

    BaseConstructor.add_constructor = function(tag, constructor) {
      if (!this.prototype.hasOwnProperty('yaml_constructors')) {
        this.prototype.yaml_constructors = util.extend({}, this.prototype.yaml_constructors);
      }
      return this.prototype.yaml_constructors[tag] = constructor;
    };


    /*
    Add a constructor function for a tag prefix.
    
    The constructor will be used to turn {Node Nodes} with the given tag prefix into a Javascript
    object.
    
    @param tag_prefix {String} The tag prefix for which the constructor should apply.
    @param multi_constructor {Function<Node,any>} A function that turns a {Node} with the given tag
      prefix into a Javascript object.
    @return {Function<Node,Any>} Returns the supplied `multi_constructor`.
     */

    BaseConstructor.add_multi_constructor = function(tag_prefix, multi_constructor) {
      if (!this.prototype.hasOwnProperty('yaml_multi_constructors')) {
        this.prototype.yaml_multi_constructors = util.extend({}, this.prototype.yaml_multi_constructors);
      }
      return this.prototype.yaml_multi_constructors[tag_prefix] = multi_constructor;
    };


    /*
    Construct a new `Constructor` instance.
     */

    function BaseConstructor() {
      this.constructed_objects = {};
      this.constructing_nodes = [];
      this.deferred_constructors = [];
    }


    /*
    Checks if a document can be constructed from the representation stream.
    
    So long as the representation stream hasn't ended, another document can be constructed.
    
    @return {Boolean} True if a document can be constructed, false otherwise.
     */

    BaseConstructor.prototype.check_data = function() {
      return this.check_node();
    };


    /*
    Construct a document from the remaining representation stream.
    
    {Constructor#check_data} must be called before calling this method.
    
    @return {any} The next document in the stream. Returns `undefined` if the stream has ended.
     */

    BaseConstructor.prototype.get_data = function() {
      if (this.check_node()) {
        return this.construct_document(this.get_node());
      }
    };


    /*
    Construct a single document from the entire representation stream.
    
    @throw {ComposerError} if there's more than one document is in the stream.
    
    @return {Node} The single document in the stream.
     */

    BaseConstructor.prototype.get_single_data = function() {
      var node;
      node = this.get_single_node();
      if (node != null) {
        return this.construct_document(node);
      }
      return null;
    };


    /*
    Construct a document node
    
    @private
     */

    BaseConstructor.prototype.construct_document = function(node) {
      var data;
      data = this.construct_object(node);
      while (!util.is_empty(this.deferred_constructors)) {
        this.deferred_constructors.pop()();
      }
      return data;
    };

    BaseConstructor.prototype.defer = function(f) {
      return this.deferred_constructors.push(f);
    };

    BaseConstructor.prototype.construct_object = function(node) {
      var constructor, object, ref, tag_prefix, tag_suffix;
      if (node.unique_id in this.constructed_objects) {
        return this.constructed_objects[node.unique_id];
      }
      if (ref = node.unique_id, indexOf.call(this.constructing_nodes, ref) >= 0) {
        throw new exports.ConstructorError(null, null, 'found unconstructable recursive node', node.start_mark);
      }
      this.constructing_nodes.push(node.unique_id);
      constructor = null;
      tag_suffix = null;
      if (node.tag in this.yaml_constructors) {
        constructor = this.yaml_constructors[node.tag];
      } else {
        for (tag_prefix in this.yaml_multi_constructors) {
          if (node.tag.indexOf(tag_prefix === 0)) {
            tag_suffix = node.tag.slice(tag_prefix.length);
            constructor = this.yaml_multi_constructors[tag_prefix];
            break;
          }
        }
        if (constructor == null) {
          if (null in this.yaml_multi_constructors) {
            tag_suffix = node.tag;
            constructor = this.yaml_multi_constructors[null];
          } else if (null in this.yaml_constructors) {
            constructor = this.yaml_constructors[null];
          } else if (node instanceof nodes.ScalarNode) {
            constructor = this.construct_scalar;
          } else if (node instanceof nodes.SequenceNode) {
            constructor = this.construct_sequence;
          } else if (node instanceof nodes.MappingNode) {
            constructor = this.construct_mapping;
          }
        }
      }
      object = constructor.call(this, tag_suffix != null ? tag_suffix : node, node);
      this.constructed_objects[node.unique_id] = object;
      this.constructing_nodes.pop();
      return object;
    };

    BaseConstructor.prototype.construct_scalar = function(node) {
      if (!(node instanceof nodes.ScalarNode)) {
        throw new exports.ConstructorError(null, null, "expected a scalar node but found " + node.id, node.start_mark);
      }
      return node.value;
    };

    BaseConstructor.prototype.construct_sequence = function(node) {
      var child, i, len, ref, results;
      if (!(node instanceof nodes.SequenceNode)) {
        throw new exports.ConstructorError(null, null, "expected a sequence node but found " + node.id, node.start_mark);
      }
      ref = node.value;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        results.push(this.construct_object(child));
      }
      return results;
    };

    BaseConstructor.prototype.construct_mapping = function(node) {
      var i, key, key_node, len, mapping, ref, ref1, value, value_node;
      if (!(node instanceof nodes.MappingNode)) {
        throw new ConstructorError(null, null, "expected a mapping node but found " + node.id, node.start_mark);
      }
      mapping = {};
      ref = node.value;
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
        key = this.construct_object(key_node);
        if (typeof key === 'object') {
          throw new exports.ConstructorError('while constructing a mapping', node.start_mark, 'found unhashable key', key_node.start_mark);
        }
        value = this.construct_object(value_node);
        mapping[key] = value;
      }
      return mapping;
    };

    BaseConstructor.prototype.construct_pairs = function(node) {
      var i, key, key_node, len, pairs, ref, ref1, value, value_node;
      if (!(node instanceof nodes.MappingNode)) {
        throw new exports.ConstructorError(null, null, "expected a mapping node but found " + node.id, node.start_mark);
      }
      pairs = [];
      ref = node.value;
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
        key = this.construct_object(key_node);
        value = this.construct_object(value_node);
        pairs.push([key, value]);
      }
      return pairs;
    };

    return BaseConstructor;

  })();

  this.Constructor = (function(superClass) {
    var BOOL_VALUES, TIMESTAMP_PARTS, TIMESTAMP_REGEX;

    extend(Constructor, superClass);

    function Constructor() {
      return Constructor.__super__.constructor.apply(this, arguments);
    }

    BOOL_VALUES = {
      on: true,
      off: false,
      "true": true,
      "false": false,
      yes: true,
      no: false
    };

    TIMESTAMP_REGEX = /^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[\x20\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\.([0-9]*))?(?:[\x20\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$/;

    TIMESTAMP_PARTS = {
      year: 1,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
      second: 6,
      fraction: 7,
      tz: 8,
      tz_sign: 9,
      tz_hour: 10,
      tz_minute: 11
    };

    Constructor.prototype.construct_scalar = function(node) {
      var i, key_node, len, ref, ref1, value_node;
      if (node instanceof nodes.MappingNode) {
        ref = node.value;
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
          if (key_node.tag === 'tag:yaml.org,2002:value') {
            return this.construct_scalar(value_node);
          }
        }
      }
      return Constructor.__super__.construct_scalar.call(this, node);
    };

    Constructor.prototype.flatten_mapping = function(node) {
      var i, index, j, key_node, len, len1, merge, ref, ref1, submerge, subnode, value, value_node;
      merge = [];
      index = 0;
      while (index < node.value.length) {
        ref = node.value[index], key_node = ref[0], value_node = ref[1];
        if (key_node.tag === 'tag:yaml.org,2002:merge') {
          node.value.splice(index, 1);
          if (value_node instanceof nodes.MappingNode) {
            this.flatten_mapping(value_node);
            merge = merge.concat(value_node.value);
          } else if (value_node instanceof nodes.SequenceNode) {
            submerge = [];
            ref1 = value_node.value;
            for (i = 0, len = ref1.length; i < len; i++) {
              subnode = ref1[i];
              if (!(subnode instanceof nodes.MappingNode)) {
                throw new exports.ConstructorError('while constructing a mapping', node.start_mark, "expected a mapping for merging, but found " + subnode.id, subnode.start_mark);
              }
              this.flatten_mapping(subnode);
              submerge.push(subnode.value);
            }
            submerge.reverse();
            for (j = 0, len1 = submerge.length; j < len1; j++) {
              value = submerge[j];
              merge = merge.concat(value);
            }
          } else {
            throw new exports.ConstructorError('while constructing a mapping', node.start_mark, "expected a mapping or list of mappings for merging but found " + value_node.id, value_node.start_mark);
          }
        } else if (key_node.tag === 'tag:yaml.org,2002:value') {
          key_node.tag = 'tag:yaml.org,2002:str';
          index++;
        } else {
          index++;
        }
      }
      if (merge.length) {
        return node.value = merge.concat(node.value);
      }
    };

    Constructor.prototype.construct_mapping = function(node) {
      if (node instanceof nodes.MappingNode) {
        this.flatten_mapping(node);
      }
      return Constructor.__super__.construct_mapping.call(this, node);
    };

    Constructor.prototype.construct_yaml_null = function(node) {
      this.construct_scalar(node);
      return null;
    };

    Constructor.prototype.construct_yaml_bool = function(node) {
      var value;
      value = this.construct_scalar(node);
      return BOOL_VALUES[value.toLowerCase()];
    };

    Constructor.prototype.construct_yaml_int = function(node) {
      var base, digit, digits, i, len, part, ref, sign, value;
      value = this.construct_scalar(node);
      value = value.replace(/_/g, '');
      sign = value[0] === '-' ? -1 : 1;
      if (ref = value[0], indexOf.call('+-', ref) >= 0) {
        value = value.slice(1);
      }
      if (value === '0') {
        return 0;
      } else if (value.indexOf('0b') === 0) {
        return sign * parseInt(value.slice(2), 2);
      } else if (value.indexOf('0x') === 0) {
        return sign * parseInt(value.slice(2), 16);
      } else if (value.indexOf('0o') === 0) {
        return sign * parseInt(value.slice(2), 8);
      } else if (value[0] === '0') {
        return sign * parseInt(value, 8);
      } else if (indexOf.call(value, ':') >= 0) {
        digits = (function() {
          var i, len, ref1, results;
          ref1 = value.split(/:/g);
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            part = ref1[i];
            results.push(parseInt(part));
          }
          return results;
        })();
        digits.reverse();
        base = 1;
        value = 0;
        for (i = 0, len = digits.length; i < len; i++) {
          digit = digits[i];
          value += digit * base;
          base *= 60;
        }
        return sign * value;
      } else {
        return sign * parseInt(value);
      }
    };

    Constructor.prototype.construct_yaml_float = function(node) {
      var base, digit, digits, i, len, part, ref, sign, value;
      value = this.construct_scalar(node);
      value = value.replace(/_/g, '').toLowerCase();
      sign = value[0] === '-' ? -1 : 1;
      if (ref = value[0], indexOf.call('+-', ref) >= 0) {
        value = value.slice(1);
      }
      if (value === '.inf') {
        return sign * 2e308;
      } else if (value === '.nan') {
        return 0/0;
      } else if (indexOf.call(value, ':') >= 0) {
        digits = (function() {
          var i, len, ref1, results;
          ref1 = value.split(/:/g);
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            part = ref1[i];
            results.push(parseFloat(part));
          }
          return results;
        })();
        digits.reverse();
        base = 1;
        value = 0.0;
        for (i = 0, len = digits.length; i < len; i++) {
          digit = digits[i];
          value += digit * base;
          base *= 60;
        }
        return sign * value;
      } else {
        return sign * parseFloat(value);
      }
    };

    Constructor.prototype.construct_yaml_binary = function(node) {
      var error, value;
      value = this.construct_scalar(node);
      try {
        if (typeof window !== "undefined" && window !== null) {
          return atob(value);
        }
        return new Buffer(value, 'base64').toString('ascii');
      } catch (error1) {
        error = error1;
        throw new exports.ConstructorError(null, null, "failed to decode base64 data: " + error, node.start_mark);
      }
    };

    Constructor.prototype.construct_yaml_timestamp = function(node) {
      var date, day, fraction, hour, index, key, match, millisecond, minute, month, second, tz_hour, tz_minute, tz_sign, value, values, year;
      value = this.construct_scalar(node);
      match = node.value.match(TIMESTAMP_REGEX);
      values = {};
      for (key in TIMESTAMP_PARTS) {
        index = TIMESTAMP_PARTS[key];
        values[key] = match[index];
      }
      year = parseInt(values.year);
      month = parseInt(values.month) - 1;
      day = parseInt(values.day);
      if (!values.hour) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = parseInt(values.hour);
      minute = parseInt(values.minute);
      second = parseInt(values.second);
      millisecond = 0;
      if (values.fraction) {
        fraction = values.fraction.slice(0, 6);
        while (fraction.length < 6) {
          fraction += '0';
        }
        fraction = parseInt(fraction);
        millisecond = Math.round(fraction / 1000);
      }
      if (values.tz_sign) {
        tz_sign = values.tz_sign === '-' ? 1 : -1;
        if (tz_hour = parseInt(values.tz_hour)) {
          hour += tz_sign * tz_hour;
        }
        if (tz_minute = parseInt(values.tz_minute)) {
          minute += tz_sign * tz_minute;
        }
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
      return date;
    };

    Constructor.prototype.construct_yaml_pair_list = function(type, node) {
      var list;
      list = [];
      if (!(node instanceof nodes.SequenceNode)) {
        throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a sequence but found " + node.id, node.start_mark);
      }
      this.defer((function(_this) {
        return function() {
          var i, key, key_node, len, ref, ref1, results, subnode, value, value_node;
          ref = node.value;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subnode = ref[i];
            if (!(subnode instanceof nodes.MappingNode)) {
              throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a mapping of length 1 but found " + subnode.id, subnode.start_mark);
            }
            if (subnode.value.length !== 1) {
              throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a mapping of length 1 but found " + subnode.id, subnode.start_mark);
            }
            ref1 = subnode.value[0], key_node = ref1[0], value_node = ref1[1];
            key = _this.construct_object(key_node);
            value = _this.construct_object(value_node);
            results.push(list.push([key, value]));
          }
          return results;
        };
      })(this));
      return list;
    };

    Constructor.prototype.construct_yaml_omap = function(node) {
      return this.construct_yaml_pair_list('an ordered map', node);
    };

    Constructor.prototype.construct_yaml_pairs = function(node) {
      return this.construct_yaml_pair_list('pairs', node);
    };

    Constructor.prototype.construct_yaml_set = function(node) {
      var data;
      data = [];
      this.defer((function(_this) {
        return function() {
          var item, results;
          results = [];
          for (item in _this.construct_mapping(node)) {
            results.push(data.push(item));
          }
          return results;
        };
      })(this));
      return data;
    };

    Constructor.prototype.construct_yaml_str = function(node) {
      return this.construct_scalar(node);
    };

    Constructor.prototype.construct_yaml_seq = function(node) {
      var data;
      data = [];
      this.defer((function(_this) {
        return function() {
          var i, item, len, ref, results;
          ref = _this.construct_sequence(node);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push(data.push(item));
          }
          return results;
        };
      })(this));
      return data;
    };

    Constructor.prototype.construct_yaml_map = function(node) {
      var data;
      data = {};
      this.defer((function(_this) {
        return function() {
          var key, ref, results, value;
          ref = _this.construct_mapping(node);
          results = [];
          for (key in ref) {
            value = ref[key];
            results.push(data[key] = value);
          }
          return results;
        };
      })(this));
      return data;
    };

    Constructor.prototype.construct_yaml_object = function(node, klass) {
      var data;
      data = new klass;
      this.defer((function(_this) {
        return function() {
          var key, ref, results, value;
          ref = _this.construct_mapping(node, true);
          results = [];
          for (key in ref) {
            value = ref[key];
            results.push(data[key] = value);
          }
          return results;
        };
      })(this));
      return data;
    };

    Constructor.prototype.construct_undefined = function(node) {
      throw new exports.ConstructorError(null, null, "could not determine a constructor for the tag " + node.tag, node.start_mark);
    };

    return Constructor;

  })(this.BaseConstructor);

  this.Constructor.add_constructor('tag:yaml.org,2002:null', this.Constructor.prototype.construct_yaml_null);

  this.Constructor.add_constructor('tag:yaml.org,2002:bool', this.Constructor.prototype.construct_yaml_bool);

  this.Constructor.add_constructor('tag:yaml.org,2002:int', this.Constructor.prototype.construct_yaml_int);

  this.Constructor.add_constructor('tag:yaml.org,2002:float', this.Constructor.prototype.construct_yaml_float);

  this.Constructor.add_constructor('tag:yaml.org,2002:binary', this.Constructor.prototype.construct_yaml_binary);

  this.Constructor.add_constructor('tag:yaml.org,2002:timestamp', this.Constructor.prototype.construct_yaml_timestamp);

  this.Constructor.add_constructor('tag:yaml.org,2002:omap', this.Constructor.prototype.construct_yaml_omap);

  this.Constructor.add_constructor('tag:yaml.org,2002:pairs', this.Constructor.prototype.construct_yaml_pairs);

  this.Constructor.add_constructor('tag:yaml.org,2002:set', this.Constructor.prototype.construct_yaml_set);

  this.Constructor.add_constructor('tag:yaml.org,2002:str', this.Constructor.prototype.construct_yaml_str);

  this.Constructor.add_constructor('tag:yaml.org,2002:seq', this.Constructor.prototype.construct_yaml_seq);

  this.Constructor.add_constructor('tag:yaml.org,2002:map', this.Constructor.prototype.construct_yaml_map);

  this.Constructor.add_constructor(null, this.Constructor.prototype.construct_undefined);

}).call(this);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/*
A small class to stand-in for a stream when you simply want to write to a string.
 */

(function() {
  var ref, ref1, ref2,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  this.StringStream = (function() {
    function StringStream() {
      this.string = '';
    }

    StringStream.prototype.write = function(chunk) {
      return this.string += chunk;
    };

    return StringStream;

  })();

  this.clone = (function(_this) {
    return function(obj) {
      return _this.extend({}, obj);
    };
  })(this);

  this.extend = function() {
    var destination, i, k, len, source, sources, v;
    destination = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      for (k in source) {
        v = source[k];
        destination[k] = v;
      }
    }
    return destination;
  };

  this.is_empty = function(obj) {
    var key;
    if (Array.isArray(obj) || typeof obj === 'string') {
      return obj.length === 0;
    }
    for (key in obj) {
      if (!hasProp.call(obj, key)) continue;
      return false;
    }
    return true;
  };

  this.inspect = (ref = (ref1 = (ref2 = __webpack_require__(16)) != null ? ref2.inspect : void 0) != null ? ref1 : global.inspect) != null ? ref : function(a) {
    return "" + a;
  };

  this.pad_left = function(str, char, length) {
    str = String(str);
    if (str.length >= length) {
      return str;
    } else if (str.length + 1 === length) {
      return "" + char + str;
    } else {
      return "" + (new Array(length - str.length + 1).join(char)) + str;
    }
  };

  this.to_hex = function(num) {
    if (typeof num === 'string') {
      num = num.charCodeAt(0);
    }
    return num.toString(16);
  };

}).call(this);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var emitter, representer, resolver, serializer, util,
    slice = [].slice;

  util = __webpack_require__(15);

  emitter = __webpack_require__(18);

  serializer = __webpack_require__(19);

  representer = __webpack_require__(20);

  resolver = __webpack_require__(21);

  this.make_dumper = function(Emitter, Serializer, Representer, Resolver) {
    var Dumper, components;
    if (Emitter == null) {
      Emitter = emitter.Emitter;
    }
    if (Serializer == null) {
      Serializer = serializer.Serializer;
    }
    if (Representer == null) {
      Representer = representer.Representer;
    }
    if (Resolver == null) {
      Resolver = resolver.Resolver;
    }
    components = [Emitter, Serializer, Representer, Resolver];
    return Dumper = (function() {
      var component;

      util.extend.apply(util, [Dumper.prototype].concat(slice.call((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = components.length; i < len; i++) {
          component = components[i];
          results.push(component.prototype);
        }
        return results;
      })())));

      function Dumper(stream, options) {
        var i, len, ref;
        if (options == null) {
          options = {};
        }
        components[0].call(this, stream, options);
        ref = components.slice(1);
        for (i = 0, len = ref.length; i < len; i++) {
          component = ref[i];
          component.call(this, options);
        }
      }

      return Dumper;

    })();
  };

  this.Dumper = this.make_dumper();

}).call(this);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var ScalarAnalysis, YAMLError, events, util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  events = __webpack_require__(11);

  util = __webpack_require__(15);

  YAMLError = __webpack_require__(12).YAMLError;

  this.EmitterError = (function(superClass) {
    extend(EmitterError, superClass);

    function EmitterError() {
      return EmitterError.__super__.constructor.apply(this, arguments);
    }

    return EmitterError;

  })(YAMLError);


  /*
  Emitter expects events obeying the following grammar:
  
  stream   ::= STREAM-START document* STREAM-END
  document ::= DOCUMENT-START node DOCUMENT-END
  node     ::= SCALA | sequence | mapping
  sequence ::= SEQUENCE-START node* SEQUENCE-END
  mapping  ::= MAPPING-START (node node)* MAPPING-END
   */

  this.Emitter = (function() {
    var C_WHITESPACE, DEFAULT_TAG_PREFIXES, ESCAPE_REPLACEMENTS;

    C_WHITESPACE = '\0 \t\r\n\x85\u2028\u2029';

    DEFAULT_TAG_PREFIXES = {
      '!': '!',
      'tag:yaml.org,2002:': '!!'
    };

    ESCAPE_REPLACEMENTS = {
      '\0': '0',
      '\x07': 'a',
      '\x08': 'b',
      '\x09': 't',
      '\x0A': 'n',
      '\x0B': 'v',
      '\x0C': 'f',
      '\x0D': 'r',
      '\x1B': 'e',
      '"': '"',
      '\\': '\\',
      '\x85': 'N',
      '\xA0': '_',
      '\u2028': 'L',
      '\u2029': 'P'
    };

    function Emitter(stream, options) {
      var ref;
      this.stream = stream;
      this.encoding = null;
      this.states = [];
      this.state = this.expect_stream_start;
      this.events = [];
      this.event = null;
      this.indents = [];
      this.indent = null;
      this.flow_level = 0;
      this.root_context = false;
      this.sequence_context = false;
      this.mapping_context = false;
      this.simple_key_context = false;
      this.line = 0;
      this.column = 0;
      this.whitespace = true;
      this.indentation = true;
      this.open_ended = false;
      this.canonical = options.canonical, this.allow_unicode = options.allow_unicode;
      if (this.canonical == null) {
        this.canonical = false;
      }
      if (this.allow_unicode == null) {
        this.allow_unicode = true;
      }
      this.best_indent = 1 < options.indent && options.indent < 10 ? options.indent : 2;
      this.best_width = options.width > this.indent * 2 ? options.width : 80;
      this.best_line_break = (ref = options.line_break) === '\r' || ref === '\n' || ref === '\r\n' ? options.line_break : '\n';
      this.tag_prefixes = null;
      this.prepared_anchor = null;
      this.prepared_tag = null;
      this.analysis = null;
      this.style = null;
    }


    /*
    Reset the state attributes (to clear self-references)
     */

    Emitter.prototype.dispose = function() {
      this.states = [];
      return this.state = null;
    };

    Emitter.prototype.emit = function(event) {
      var results;
      this.events.push(event);
      results = [];
      while (!this.need_more_events()) {
        this.event = this.events.shift();
        this.state();
        results.push(this.event = null);
      }
      return results;
    };


    /*
    In some cases, we wait for a few next events before emitting.
     */

    Emitter.prototype.need_more_events = function() {
      var event;
      if (this.events.length === 0) {
        return true;
      }
      event = this.events[0];
      if (event instanceof events.DocumentStartEvent) {
        return this.need_events(1);
      } else if (event instanceof events.SequenceStartEvent) {
        return this.need_events(2);
      } else if (event instanceof events.MappingStartEvent) {
        return this.need_events(3);
      } else {
        return false;
      }
    };

    Emitter.prototype.need_events = function(count) {
      var event, i, len, level, ref;
      level = 0;
      ref = this.events.slice(1);
      for (i = 0, len = ref.length; i < len; i++) {
        event = ref[i];
        if (event instanceof events.DocumentStartEvent || event instanceof events.CollectionStartEvent) {
          level++;
        } else if (event instanceof events.DocumentEndEvent || event instanceof events.CollectionEndEvent) {
          level--;
        } else if (event instanceof events.StreamEndEvent) {
          level = -1;
        }
        if (level < 0) {
          return false;
        }
      }
      return this.events.length < count + 1;
    };

    Emitter.prototype.increase_indent = function(options) {
      if (options == null) {
        options = {};
      }
      this.indents.push(this.indent);
      if (this.indent == null) {
        return this.indent = options.flow ? this.best_indent : 0;
      } else if (!options.indentless) {
        return this.indent += this.best_indent;
      }
    };

    Emitter.prototype.expect_stream_start = function() {
      if (this.event instanceof events.StreamStartEvent) {
        if (this.event.encoding && !('encoding' in this.stream)) {
          this.encoding = this.event.encoding;
        }
        this.write_stream_start();
        return this.state = this.expect_first_document_start;
      } else {
        return this.error('expected StreamStartEvent, but got', this.event);
      }
    };

    Emitter.prototype.expect_nothing = function() {
      return this.error('expected nothing, but got', this.event);
    };

    Emitter.prototype.expect_first_document_start = function() {
      return this.expect_document_start(true);
    };

    Emitter.prototype.expect_document_start = function(first) {
      var explicit, handle, i, k, len, prefix, ref;
      if (first == null) {
        first = false;
      }
      if (this.event instanceof events.DocumentStartEvent) {
        if ((this.event.version || this.event.tags) && this.open_ended) {
          this.write_indicator('...', true);
          this.write_indent();
        }
        if (this.event.version) {
          this.write_version_directive(this.prepare_version(this.event.version));
        }
        this.tag_prefixes = util.clone(DEFAULT_TAG_PREFIXES);
        if (this.event.tags) {
          ref = ((function() {
            var ref, results;
            ref = this.event.tags;
            results = [];
            for (k in ref) {
              if (!hasProp.call(ref, k)) continue;
              results.push(k);
            }
            return results;
          }).call(this)).sort();
          for (i = 0, len = ref.length; i < len; i++) {
            handle = ref[i];
            prefix = this.event.tags[handle];
            this.tag_prefixes[prefix] = handle;
            this.write_tag_directive(this.prepare_tag_handle(handle), this.prepare_tag_prefix(prefix));
          }
        }
        explicit = !first || this.event.explicit || this.canonical || this.event.version || this.event.tags || this.check_empty_document();
        if (explicit) {
          this.write_indent();
          this.write_indicator('---', true);
          if (this.canonical) {
            this.write_indent();
          }
        }
        return this.state = this.expect_document_root;
      } else if (this.event instanceof events.StreamEndEvent) {
        if (this.open_ended) {
          this.write_indicator('...', true);
          this.write_indent();
        }
        this.write_stream_end();
        return this.state = this.expect_nothing;
      } else {
        return this.error('expected DocumentStartEvent, but got', this.event);
      }
    };

    Emitter.prototype.expect_document_end = function() {
      if (this.event instanceof events.DocumentEndEvent) {
        this.write_indent();
        if (this.event.explicit) {
          this.write_indicator('...', true);
          this.write_indent();
        }
        this.flush_stream();
        return this.state = this.expect_document_start;
      } else {
        return this.error('expected DocumentEndEvent, but got', this.event);
      }
    };

    Emitter.prototype.expect_document_root = function() {
      this.states.push(this.expect_document_end);
      return this.expect_node({
        root: true
      });
    };

    Emitter.prototype.expect_node = function(expect) {
      if (expect == null) {
        expect = {};
      }
      this.root_context = !!expect.root;
      this.sequence_context = !!expect.sequence;
      this.mapping_context = !!expect.mapping;
      this.simple_key_context = !!expect.simple_key;
      if (this.event instanceof events.AliasEvent) {
        return this.expect_alias();
      } else if (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent) {
        this.process_anchor('&');
        this.process_tag();
        if (this.event instanceof events.ScalarEvent) {
          return this.expect_scalar();
        } else if (this.event instanceof events.SequenceStartEvent) {
          if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_sequence()) {
            return this.expect_flow_sequence();
          } else {
            return this.expect_block_sequence();
          }
        } else if (this.event instanceof events.MappingStartEvent) {
          if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_mapping()) {
            return this.expect_flow_mapping();
          } else {
            return this.expect_block_mapping();
          }
        }
      } else {
        return this.error('expected NodeEvent, but got', this.event);
      }
    };

    Emitter.prototype.expect_alias = function() {
      if (!this.event.anchor) {
        this.error('anchor is not specified for alias');
      }
      this.process_anchor('*');
      return this.state = this.states.pop();
    };

    Emitter.prototype.expect_scalar = function() {
      this.increase_indent({
        flow: true
      });
      this.process_scalar();
      this.indent = this.indents.pop();
      return this.state = this.states.pop();
    };

    Emitter.prototype.expect_flow_sequence = function() {
      this.write_indicator('[', true, {
        whitespace: true
      });
      this.flow_level++;
      this.increase_indent({
        flow: true
      });
      return this.state = this.expect_first_flow_sequence_item;
    };

    Emitter.prototype.expect_first_flow_sequence_item = function() {
      if (this.event instanceof events.SequenceEndEvent) {
        this.indent = this.indents.pop();
        this.flow_level--;
        this.write_indicator(']', false);
        return this.state = this.states.pop();
      } else {
        if (this.canonical || this.column > this.best_width) {
          this.write_indent();
        }
        this.states.push(this.expect_flow_sequence_item);
        return this.expect_node({
          sequence: true
        });
      }
    };

    Emitter.prototype.expect_flow_sequence_item = function() {
      if (this.event instanceof events.SequenceEndEvent) {
        this.indent = this.indents.pop();
        this.flow_level--;
        if (this.canonical) {
          this.write_indicator(',', false);
          this.write_indent();
        }
        this.write_indicator(']', false);
        return this.state = this.states.pop();
      } else {
        this.write_indicator(',', false);
        if (this.canonical || this.column > this.best_width) {
          this.write_indent();
        }
        this.states.push(this.expect_flow_sequence_item);
        return this.expect_node({
          sequence: true
        });
      }
    };

    Emitter.prototype.expect_flow_mapping = function() {
      this.write_indicator('{', true, {
        whitespace: true
      });
      this.flow_level++;
      this.increase_indent({
        flow: true
      });
      return this.state = this.expect_first_flow_mapping_key;
    };

    Emitter.prototype.expect_first_flow_mapping_key = function() {
      if (this.event instanceof events.MappingEndEvent) {
        this.indent = this.indents.pop();
        this.flow_level--;
        this.write_indicator('}', false);
        return this.state = this.states.pop();
      } else {
        if (this.canonical || this.column > this.best_width) {
          this.write_indent();
        }
        if (!this.canonical && this.check_simple_key()) {
          this.states.push(this.expect_flow_mapping_simple_value);
          return this.expect_node({
            mapping: true,
            simple_key: true
          });
        } else {
          this.write_indicator('?', true);
          this.states.push(this.expect_flow_mapping_value);
          return this.expect_node({
            mapping: true
          });
        }
      }
    };

    Emitter.prototype.expect_flow_mapping_key = function() {
      if (this.event instanceof events.MappingEndEvent) {
        this.indent = this.indents.pop();
        this.flow_level--;
        if (this.canonical) {
          this.write_indicator(',', false);
          this.write_indent();
        }
        this.write_indicator('}', false);
        return this.state = this.states.pop();
      } else {
        this.write_indicator(',', false);
        if (this.canonical || this.column > this.best_width) {
          this.write_indent();
        }
        if (!this.canonical && this.check_simple_key()) {
          this.states.push(this.expect_flow_mapping_simple_value);
          return this.expect_node({
            mapping: true,
            simple_key: true
          });
        } else {
          this.write_indicator('?', true);
          this.states.push(this.expect_flow_mapping_value);
          return this.expect_node({
            mapping: true
          });
        }
      }
    };

    Emitter.prototype.expect_flow_mapping_simple_value = function() {
      this.write_indicator(':', false);
      this.states.push(this.expect_flow_mapping_key);
      return this.expect_node({
        mapping: true
      });
    };

    Emitter.prototype.expect_flow_mapping_value = function() {
      if (this.canonical || this.column > this.best_width) {
        this.write_indent();
      }
      this.write_indicator(':', true);
      this.states.push(this.expect_flow_mapping_key);
      return this.expect_node({
        mapping: true
      });
    };

    Emitter.prototype.expect_block_sequence = function() {
      var indentless;
      indentless = this.mapping_context && !this.indentation;
      this.increase_indent({
        indentless: indentless
      });
      return this.state = this.expect_first_block_sequence_item;
    };

    Emitter.prototype.expect_first_block_sequence_item = function() {
      return this.expect_block_sequence_item(true);
    };

    Emitter.prototype.expect_block_sequence_item = function(first) {
      if (first == null) {
        first = false;
      }
      if (!first && this.event instanceof events.SequenceEndEvent) {
        this.indent = this.indents.pop();
        return this.state = this.states.pop();
      } else {
        this.write_indent();
        this.write_indicator('-', true, {
          indentation: true
        });
        this.states.push(this.expect_block_sequence_item);
        return this.expect_node({
          sequence: true
        });
      }
    };

    Emitter.prototype.expect_block_mapping = function() {
      this.increase_indent();
      return this.state = this.expect_first_block_mapping_key;
    };

    Emitter.prototype.expect_first_block_mapping_key = function() {
      return this.expect_block_mapping_key(true);
    };

    Emitter.prototype.expect_block_mapping_key = function(first) {
      if (first == null) {
        first = false;
      }
      if (!first && this.event instanceof events.MappingEndEvent) {
        this.indent = this.indents.pop();
        return this.state = this.states.pop();
      } else {
        this.write_indent();
        if (this.check_simple_key()) {
          this.states.push(this.expect_block_mapping_simple_value);
          return this.expect_node({
            mapping: true,
            simple_key: true
          });
        } else {
          this.write_indicator('?', true, {
            indentation: true
          });
          this.states.push(this.expect_block_mapping_value);
          return this.expect_node({
            mapping: true
          });
        }
      }
    };

    Emitter.prototype.expect_block_mapping_simple_value = function() {
      this.write_indicator(':', false);
      this.states.push(this.expect_block_mapping_key);
      return this.expect_node({
        mapping: true
      });
    };

    Emitter.prototype.expect_block_mapping_value = function() {
      this.write_indent();
      this.write_indicator(':', true, {
        indentation: true
      });
      this.states.push(this.expect_block_mapping_key);
      return this.expect_node({
        mapping: true
      });
    };

    Emitter.prototype.check_empty_document = function() {
      var event;
      if (!(this.event instanceof events.DocumentStartEvent) || this.events.length === 0) {
        return false;
      }
      event = this.events[0];
      return event instanceof events.ScalarEvent && (event.anchor == null) && (event.tag == null) && event.implicit && event.value === '';
    };

    Emitter.prototype.check_empty_sequence = function() {
      return this.event instanceof events.SequenceStartEvent && this.events[0] instanceof events.SequenceEndEvent;
    };

    Emitter.prototype.check_empty_mapping = function() {
      return this.event instanceof events.MappingStartEvent && this.events[0] instanceof events.MappingEndEvent;
    };

    Emitter.prototype.check_simple_key = function() {
      var length;
      length = 0;
      if (this.event instanceof events.NodeEvent && (this.event.anchor != null)) {
        if (this.prepared_anchor == null) {
          this.prepared_anchor = this.prepare_anchor(this.event.anchor);
        }
        length += this.prepared_anchor.length;
      }
      if ((this.event.tag != null) && (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent)) {
        if (this.prepared_tag == null) {
          this.prepared_tag = this.prepare_tag(this.event.tag);
        }
        length += this.prepared_tag.length;
      }
      if (this.event instanceof events.ScalarEvent) {
        if (this.analysis == null) {
          this.analysis = this.analyze_scalar(this.event.value);
        }
        length += this.analysis.scalar.length;
      }
      return length < 128 && (this.event instanceof events.AliasEvent || (this.event instanceof events.ScalarEvent && !this.analysis.empty && !this.analysis.multiline) || this.check_empty_sequence() || this.check_empty_mapping());
    };

    Emitter.prototype.process_anchor = function(indicator) {
      if (this.event.anchor == null) {
        this.prepared_anchor = null;
        return;
      }
      if (this.prepared_anchor == null) {
        this.prepared_anchor = this.prepare_anchor(this.event.anchor);
      }
      if (this.prepared_anchor) {
        this.write_indicator("" + indicator + this.prepared_anchor, true);
      }
      return this.prepared_anchor = null;
    };

    Emitter.prototype.process_tag = function() {
      var tag;
      tag = this.event.tag;
      if (this.event instanceof events.ScalarEvent) {
        if (this.style == null) {
          this.style = this.choose_scalar_style();
        }
        if ((!this.canonical || (tag == null)) && ((this.style === '' && this.event.implicit[0]) || (this.style !== '' && this.event.implicit[1]))) {
          this.prepared_tag = null;
          return;
        }
        if (this.event.implicit[0] && (tag == null)) {
          tag = '!';
          this.prepared_tag = null;
        }
      } else if ((!this.canonical || (tag == null)) && this.event.implicit) {
        this.prepared_tag = null;
        return;
      }
      if (tag == null) {
        this.error('tag is not specified');
      }
      if (this.prepared_tag == null) {
        this.prepared_tag = this.prepare_tag(tag);
      }
      this.write_indicator(this.prepared_tag, true);
      return this.prepared_tag = null;
    };

    Emitter.prototype.process_scalar = function() {
      var split;
      if (this.analysis == null) {
        this.analysis = this.analyze_scalar(this.event.value);
      }
      if (this.style == null) {
        this.style = this.choose_scalar_style();
      }
      split = !this.simple_key_context;
      switch (this.style) {
        case '"':
          this.write_double_quoted(this.analysis.scalar, split);
          break;
        case "'":
          this.write_single_quoted(this.analysis.scalar, split);
          break;
        case '>':
          this.write_folded(this.analysis.scalar);
          break;
        case '|':
          this.write_literal(this.analysis.scalar);
          break;
        default:
          this.write_plain(this.analysis.scalar, split);
      }
      this.analysis = null;
      return this.style = null;
    };

    Emitter.prototype.choose_scalar_style = function() {
      var ref;
      if (this.analysis == null) {
        this.analysis = this.analyze_scalar(this.event.value);
      }
      if (this.event.style === '"' || this.canonical) {
        return '"';
      }
      if (!this.event.style && this.event.implicit[0] && !(this.simple_key_context && (this.analysis.empty || this.analysis.multiline)) && ((this.flow_level && this.analysis.allow_flow_plain) || (!this.flow_level && this.analysis.allow_block_plain))) {
        return '';
      }
      if (this.event.style && (ref = this.event.style, indexOf.call('|>', ref) >= 0) && !this.flow_level && !this.simple_key_context && this.analysis.allow_block) {
        return this.event.style;
      }
      if ((!this.event.style || this.event.style === "'") && this.analysis.allow_single_quoted && !(this.simple_key_context && this.analysis.multiline)) {
        return "'";
      }
      return '"';
    };

    Emitter.prototype.prepare_version = function(arg) {
      var major, minor, version;
      major = arg[0], minor = arg[1];
      version = major + "." + minor;
      if (major === 1) {
        return version;
      } else {
        return this.error('unsupported YAML version', version);
      }
    };

    Emitter.prototype.prepare_tag_handle = function(handle) {
      var char, i, len, ref;
      if (!handle) {
        this.error('tag handle must not be empty');
      }
      if (handle[0] !== '!' || handle.slice(-1) !== '!') {
        this.error("tag handle must start and end with '!':", handle);
      }
      ref = handle.slice(1, -1);
      for (i = 0, len = ref.length; i < len; i++) {
        char = ref[i];
        if (!(('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0)) {
          this.error("invalid character '" + char + "' in the tag handle:", handle);
        }
      }
      return handle;
    };

    Emitter.prototype.prepare_tag_prefix = function(prefix) {
      var char, chunks, end, start;
      if (!prefix) {
        this.error('tag prefix must not be empty');
      }
      chunks = [];
      start = 0;
      end = +(prefix[0] === '!');
      while (end < prefix.length) {
        char = prefix[end];
        if (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?!:@&=+$,_.~*\'()[]', char) >= 0) {
          end++;
        } else {
          if (start < end) {
            chunks.push(prefix.slice(start, end));
          }
          start = end = end + 1;
          chunks.push(char);
        }
      }
      if (start < end) {
        chunks.push(prefix.slice(start, end));
      }
      return chunks.join('');
    };

    Emitter.prototype.prepare_tag = function(tag) {
      var char, chunks, end, handle, i, k, len, prefix, ref, start, suffix, suffix_text;
      if (!tag) {
        this.error('tag must not be empty');
      }
      if (tag === '!') {
        return tag;
      }
      handle = null;
      suffix = tag;
      ref = ((function() {
        var ref, results;
        ref = this.tag_prefixes;
        results = [];
        for (k in ref) {
          if (!hasProp.call(ref, k)) continue;
          results.push(k);
        }
        return results;
      }).call(this)).sort();
      for (i = 0, len = ref.length; i < len; i++) {
        prefix = ref[i];
        if (tag.indexOf(prefix) === 0 && (prefix === '!' || prefix.length < tag.length)) {
          handle = this.tag_prefixes[prefix];
          suffix = tag.slice(prefix.length);
        }
      }
      chunks = [];
      start = end = 0;
      while (end < suffix.length) {
        char = suffix[end];
        if (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?!:@&=+$,_.~*\'()[]', char) >= 0 || (char === '!' && handle !== '!')) {
          end++;
        } else {
          if (start < end) {
            chunks.push(suffix.slice(start, end));
          }
          start = end = end + 1;
          chunks.push(char);
        }
      }
      if (start < end) {
        chunks.push(suffix.slice(start, end));
      }
      suffix_text = chunks.join('');
      if (handle) {
        return "" + handle + suffix_text;
      } else {
        return "!<" + suffix_text + ">";
      }
    };

    Emitter.prototype.prepare_anchor = function(anchor) {
      var char, i, len;
      if (!anchor) {
        this.error('anchor must not be empty');
      }
      for (i = 0, len = anchor.length; i < len; i++) {
        char = anchor[i];
        if (!(('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0)) {
          this.error("invalid character '" + char + "' in the anchor:", anchor);
        }
      }
      return anchor;
    };

    Emitter.prototype.analyze_scalar = function(scalar) {
      var allow_block, allow_block_plain, allow_double_quoted, allow_flow_plain, allow_single_quoted, block_indicators, break_space, char, flow_indicators, followed_by_whitespace, i, index, leading_break, leading_space, len, line_breaks, preceded_by_whitespace, previous_break, previous_space, ref, ref1, space_break, special_characters, trailing_break, trailing_space, unicode_characters;
      if (!scalar) {
        new ScalarAnalysis(scalar, true, false, false, true, true, true, false);
      }
      block_indicators = false;
      flow_indicators = false;
      line_breaks = false;
      special_characters = false;
      unicode_characters = false;
      leading_space = false;
      leading_break = false;
      trailing_space = false;
      trailing_break = false;
      break_space = false;
      space_break = false;
      if (scalar.indexOf('---') === 0 || scalar.indexOf('...') === 0) {
        block_indicators = true;
        flow_indicators = true;
      }
      preceded_by_whitespace = true;
      followed_by_whitespace = scalar.length === 1 || (ref = scalar[1], indexOf.call('\0 \t\r\n\x85\u2028\u2029', ref) >= 0);
      previous_space = false;
      previous_break = false;
      index = 0;
      for (index = i = 0, len = scalar.length; i < len; index = ++i) {
        char = scalar[index];
        if (index === 0) {
          if (indexOf.call('#,[]{}&*!|>\'"%@`', char) >= 0 || (char === '-' && followed_by_whitespace)) {
            flow_indicators = true;
            block_indicators = true;
          } else if (indexOf.call('?:', char) >= 0) {
            flow_indicators = true;
            if (followed_by_whitespace) {
              block_indicators = true;
            }
          }
        } else {
          if (indexOf.call(',?[]{}', char) >= 0) {
            flow_indicators = true;
          } else if (char === ':') {
            flow_indicators = true;
            if (followed_by_whitespace) {
              block_indicators = true;
            }
          } else if (char === '#' && preceded_by_whitespace) {
            flow_indicators = true;
            block_indicators = true;
          }
        }
        if (indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
          line_breaks = true;
        }
        if (!(char === '\n' || ('\x20' <= char && char <= '\x7e'))) {
          if (char !== '\uFEFF' && (char === '\x85' || ('\xA0' <= char && char <= '\uD7FF') || ('\uE000' <= char && char <= '\uFFFD'))) {
            unicode_characters = true;
            if (!this.allow_unicode) {
              special_characters = true;
            }
          } else {
            special_characters = true;
          }
        }
        if (char === ' ') {
          if (index === 0) {
            leading_space = true;
          }
          if (index === scalar.length - 1) {
            trailing_space = true;
          }
          if (previous_break) {
            break_space = true;
          }
          previous_break = false;
          previous_space = true;
        } else if (indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
          if (index === 0) {
            leading_break = true;
          }
          if (index === scalar.length - 1) {
            trailing_break = true;
          }
          if (previous_space) {
            space_break = true;
          }
          previous_break = true;
          previous_space = false;
        } else {
          previous_break = false;
          previous_space = false;
        }
        preceded_by_whitespace = indexOf.call(C_WHITESPACE, char) >= 0;
        followed_by_whitespace = index + 2 >= scalar.length || (ref1 = scalar[index + 2], indexOf.call(C_WHITESPACE, ref1) >= 0);
      }
      allow_flow_plain = true;
      allow_block_plain = true;
      allow_single_quoted = true;
      allow_double_quoted = true;
      allow_block = true;
      if (leading_space || leading_break || trailing_space || trailing_break) {
        allow_flow_plain = allow_block_plain = false;
      }
      if (trailing_space) {
        allow_block = false;
      }
      if (break_space) {
        allow_flow_plain = allow_block_plain = allow_single_quoted = false;
      }
      if (space_break || special_characters) {
        allow_flow_plain = allow_block_plain = allow_single_quoted = allow_block = false;
      }
      if (line_breaks) {
        allow_flow_plain = allow_block_plain = false;
      }
      if (flow_indicators) {
        allow_flow_plain = false;
      }
      if (block_indicators) {
        allow_block_plain = false;
      }
      return new ScalarAnalysis(scalar, false, line_breaks, allow_flow_plain, allow_block_plain, allow_single_quoted, allow_double_quoted, allow_block);
    };


    /*
    Write BOM if needed.
     */

    Emitter.prototype.write_stream_start = function() {
      if (this.encoding && this.encoding.indexOf('utf-16') === 0) {
        return this.stream.write('\uFEFF', this.encoding);
      }
    };

    Emitter.prototype.write_stream_end = function() {
      return this.flush_stream();
    };

    Emitter.prototype.write_indicator = function(indicator, need_whitespace, options) {
      var data;
      if (options == null) {
        options = {};
      }
      data = this.whitespace || !need_whitespace ? indicator : ' ' + indicator;
      this.whitespace = !!options.whitespace;
      this.indentation && (this.indentation = !!options.indentation);
      this.column += data.length;
      this.open_ended = false;
      return this.stream.write(data, this.encoding);
    };

    Emitter.prototype.write_indent = function() {
      var data, indent, ref;
      indent = (ref = this.indent) != null ? ref : 0;
      if (!this.indentation || this.column > indent || (this.column === indent && !this.whitespace)) {
        this.write_line_break();
      }
      if (this.column < indent) {
        this.whitespace = true;
        data = new Array(indent - this.column + 1).join(' ');
        this.column = indent;
        return this.stream.write(data, this.encoding);
      }
    };

    Emitter.prototype.write_line_break = function(data) {
      this.whitespace = true;
      this.indentation = true;
      this.line += 1;
      this.column = 0;
      return this.stream.write(data != null ? data : this.best_line_break, this.encoding);
    };

    Emitter.prototype.write_version_directive = function(version_text) {
      this.stream.write("%YAML " + version_text, this.encoding);
      return this.write_line_break();
    };

    Emitter.prototype.write_tag_directive = function(handle_text, prefix_text) {
      this.stream.write("%TAG " + handle_text + " " + prefix_text, this.encoding);
      return this.write_line_break();
    };

    Emitter.prototype.write_single_quoted = function(text, split) {
      var br, breaks, char, data, end, i, len, ref, spaces, start;
      if (split == null) {
        split = true;
      }
      this.write_indicator("'", true);
      spaces = false;
      breaks = false;
      start = end = 0;
      while (end <= text.length) {
        char = text[end];
        if (spaces) {
          if ((char == null) || char !== ' ') {
            if (start + 1 === end && this.column > this.best_width && split && start !== 0 && end !== text.length) {
              this.write_indent();
            } else {
              data = text.slice(start, end);
              this.column += data.length;
              this.stream.write(data, this.encoding);
            }
            start = end;
          }
        } else if (breaks) {
          if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
            if (text[start] === '\n') {
              this.write_line_break();
            }
            ref = text.slice(start, end);
            for (i = 0, len = ref.length; i < len; i++) {
              br = ref[i];
              if (br === '\n') {
                this.write_line_break();
              } else {
                this.write_line_break(br);
              }
            }
            this.write_indent();
            start = end;
          }
        } else if (((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0 || char === "'") && start < end) {
          data = text.slice(start, end);
          this.column += data.length;
          this.stream.write(data, this.encoding);
          start = end;
        }
        if (char === "'") {
          this.column += 2;
          this.stream.write("''", this.encoding);
          start = end + 1;
        }
        if (char != null) {
          spaces = char === ' ';
          breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
        }
        end++;
      }
      return this.write_indicator("'", false);
    };

    Emitter.prototype.write_double_quoted = function(text, split) {
      var char, data, end, start;
      if (split == null) {
        split = true;
      }
      this.write_indicator('"', true);
      start = end = 0;
      while (end <= text.length) {
        char = text[end];
        if ((char == null) || indexOf.call('"\\\x85\u2028\u2029\uFEFF', char) >= 0 || !(('\x20' <= char && char <= '\x7E') || (this.allow_unicode && (('\xA0' <= char && char <= '\uD7FF') || ('\uE000' <= char && char <= '\uFFFD'))))) {
          if (start < end) {
            data = text.slice(start, end);
            this.column += data.length;
            this.stream.write(data, this.encoding);
            start = end;
          }
          if (char != null) {
            data = char in ESCAPE_REPLACEMENTS ? '\\' + ESCAPE_REPLACEMENTS[char] : char <= '\xFF' ? "\\x" + (util.pad_left(util.to_hex(char), '0', 2)) : char <= '\uFFFF' ? "\\u" + (util.pad_left(util.to_hex(char), '0', 4)) : "\\U" + (util.pad_left(util.to_hex(char), '0', 16));
            this.column += data.length;
            this.stream.write(data, this.encoding);
            start = end + 1;
          }
        }
        if (split && (0 < end && end < text.length - 1) && (char === ' ' || start >= end) && this.column + (end - start) > this.best_width) {
          data = text.slice(start, end) + "\\";
          if (start < end) {
            start = end;
          }
          this.column += data.length;
          this.stream.write(data, this.encoding);
          this.write_indent();
          this.whitespace = false;
          this.indentation = false;
          if (text[start] === ' ') {
            data = '\\';
            this.column += data.length;
            this.stream.write(data, this.encoding);
          }
        }
        end++;
      }
      return this.write_indicator('"', false);
    };

    Emitter.prototype.write_folded = function(text) {
      var br, breaks, char, data, end, hints, i, leading_space, len, ref, results, spaces, start;
      hints = this.determine_block_hints(text);
      this.write_indicator(">" + hints, true);
      if (hints.slice(-1) === '+') {
        this.open_ended = true;
      }
      this.write_line_break();
      leading_space = true;
      breaks = true;
      spaces = false;
      start = end = 0;
      results = [];
      while (end <= text.length) {
        char = text[end];
        if (breaks) {
          if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
            if (!leading_space && (char != null) && char !== ' ' && text[start] === '\n') {
              this.write_line_break();
            }
            leading_space = char === ' ';
            ref = text.slice(start, end);
            for (i = 0, len = ref.length; i < len; i++) {
              br = ref[i];
              if (br === '\n') {
                this.write_line_break();
              } else {
                this.write_line_break(br);
              }
            }
            if (char != null) {
              this.write_indent();
            }
            start = end;
          }
        } else if (spaces) {
          if (char !== ' ') {
            if (start + 1 === end && this.column > this.best_width) {
              this.write_indent();
            } else {
              data = text.slice(start, end);
              this.column += data.length;
              this.stream.write(data, this.encoding);
            }
            start = end;
          }
        } else if ((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0) {
          data = text.slice(start, end);
          this.column += data.length;
          this.stream.write(data, this.encoding);
          if (char == null) {
            this.write_line_break();
          }
          start = end;
        }
        if (char != null) {
          breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
          spaces = char === ' ';
        }
        results.push(end++);
      }
      return results;
    };

    Emitter.prototype.write_literal = function(text) {
      var br, breaks, char, data, end, hints, i, len, ref, results, start;
      hints = this.determine_block_hints(text);
      this.write_indicator("|" + hints, true);
      if (hints.slice(-1) === '+') {
        this.open_ended = true;
      }
      this.write_line_break();
      breaks = true;
      start = end = 0;
      results = [];
      while (end <= text.length) {
        char = text[end];
        if (breaks) {
          if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) < 0) {
            ref = text.slice(start, end);
            for (i = 0, len = ref.length; i < len; i++) {
              br = ref[i];
              if (br === '\n') {
                this.write_line_break();
              } else {
                this.write_line_break(br);
              }
            }
            if (char != null) {
              this.write_indent();
            }
            start = end;
          }
        } else {
          if ((char == null) || indexOf.call('\n\x85\u2028\u2029', char) >= 0) {
            data = text.slice(start, end);
            this.stream.write(data, this.encoding);
            if (char == null) {
              this.write_line_break();
            }
            start = end;
          }
        }
        if (char != null) {
          breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
        }
        results.push(end++);
      }
      return results;
    };

    Emitter.prototype.write_plain = function(text, split) {
      var br, breaks, char, data, end, i, len, ref, results, spaces, start;
      if (split == null) {
        split = true;
      }
      if (!text) {
        return;
      }
      if (this.root_context) {
        this.open_ended = true;
      }
      if (!this.whitespace) {
        data = ' ';
        this.column += data.length;
        this.stream.write(data, this.encoding);
      }
      this.whitespace = false;
      this.indentation = false;
      spaces = false;
      breaks = false;
      start = end = 0;
      results = [];
      while (end <= text.length) {
        char = text[end];
        if (spaces) {
          if (char !== ' ') {
            if (start + 1 === end && this.column > this.best_width && split) {
              this.write_indent();
              this.whitespace = false;
              this.indentation = false;
            } else {
              data = text.slice(start, end);
              this.column += data.length;
              this.stream.write(data, this.encoding);
            }
            start = end;
          }
        } else if (breaks) {
          if (indexOf.call('\n\x85\u2028\u2029', char) < 0) {
            if (text[start] === '\n') {
              this.write_line_break();
            }
            ref = text.slice(start, end);
            for (i = 0, len = ref.length; i < len; i++) {
              br = ref[i];
              if (br === '\n') {
                this.write_line_break();
              } else {
                this.write_line_break(br);
              }
            }
            this.write_indent();
            this.whitespace = false;
            this.indentation = false;
            start = end;
          }
        } else {
          if ((char == null) || indexOf.call(' \n\x85\u2028\u2029', char) >= 0) {
            data = text.slice(start, end);
            this.column += data.length;
            this.stream.write(data, this.encoding);
            start = end;
          }
        }
        if (char != null) {
          spaces = char === ' ';
          breaks = indexOf.call('\n\x85\u2028\u2029', char) >= 0;
        }
        results.push(end++);
      }
      return results;
    };

    Emitter.prototype.determine_block_hints = function(text) {
      var first, hints, i, last, penultimate;
      hints = '';
      first = text[0], i = text.length - 2, penultimate = text[i++], last = text[i++];
      if (indexOf.call(' \n\x85\u2028\u2029', first) >= 0) {
        hints += this.best_indent;
      }
      if (indexOf.call('\n\x85\u2028\u2029', last) < 0) {
        hints += '-';
      } else if (text.length === 1 || indexOf.call('\n\x85\u2028\u2029', penultimate) >= 0) {
        hints += '+';
      }
      return hints;
    };

    Emitter.prototype.flush_stream = function() {
      var base;
      return typeof (base = this.stream).flush === "function" ? base.flush() : void 0;
    };


    /*
    Helper for common error pattern.
     */

    Emitter.prototype.error = function(message, context) {
      var ref, ref1;
      if (context) {
        context = (ref = context != null ? (ref1 = context.constructor) != null ? ref1.name : void 0 : void 0) != null ? ref : util.inspect(context);
      }
      throw new exports.EmitterError("" + message + (context ? " " + context : ''));
    };

    return Emitter;

  })();

  ScalarAnalysis = (function() {
    function ScalarAnalysis(scalar1, empty, multiline, allow_flow_plain1, allow_block_plain1, allow_single_quoted1, allow_double_quoted1, allow_block1) {
      this.scalar = scalar1;
      this.empty = empty;
      this.multiline = multiline;
      this.allow_flow_plain = allow_flow_plain1;
      this.allow_block_plain = allow_block_plain1;
      this.allow_single_quoted = allow_single_quoted1;
      this.allow_double_quoted = allow_double_quoted1;
      this.allow_block = allow_block1;
    }

    return ScalarAnalysis;

  })();

}).call(this);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, events, nodes, util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  events = __webpack_require__(11);

  nodes = __webpack_require__(13);

  util = __webpack_require__(15);

  YAMLError = __webpack_require__(12).YAMLError;

  this.SerializerError = (function(superClass) {
    extend(SerializerError, superClass);

    function SerializerError() {
      return SerializerError.__super__.constructor.apply(this, arguments);
    }

    return SerializerError;

  })(YAMLError);

  this.Serializer = (function() {
    function Serializer(arg) {
      var ref;
      ref = arg != null ? arg : {}, this.encoding = ref.encoding, this.explicit_start = ref.explicit_start, this.explicit_end = ref.explicit_end, this.version = ref.version, this.tags = ref.tags;
      this.serialized_nodes = {};
      this.anchors = {};
      this.last_anchor_id = 0;
      this.closed = null;
    }

    Serializer.prototype.open = function() {
      if (this.closed === null) {
        this.emit(new events.StreamStartEvent(this.encoding));
        return this.closed = false;
      } else if (this.closed) {
        throw new SerializerError('serializer is closed');
      } else {
        throw new SerializerError('serializer is already open');
      }
    };

    Serializer.prototype.close = function() {
      if (this.closed === null) {
        throw new SerializerError('serializer is not opened');
      } else if (!this.closed) {
        this.emit(new events.StreamEndEvent);
        return this.closed = true;
      }
    };

    Serializer.prototype.serialize = function(node) {
      if (this.closed === null) {
        throw new SerializerError('serializer is not opened');
      } else if (this.closed) {
        throw new SerializerError('serializer is closed');
      }
      if (node != null) {
        this.emit(new events.DocumentStartEvent(void 0, void 0, this.explicit_start, this.version, this.tags));
        this.anchor_node(node);
        this.serialize_node(node);
        this.emit(new events.DocumentEndEvent(void 0, void 0, this.explicit_end));
      }
      this.serialized_nodes = {};
      this.anchors = {};
      return this.last_anchor_id = 0;
    };

    Serializer.prototype.anchor_node = function(node) {
      var base, i, item, j, key, len, len1, name, ref, ref1, ref2, results, results1, value;
      if (node.unique_id in this.anchors) {
        return (base = this.anchors)[name = node.unique_id] != null ? base[name] : base[name] = this.generate_anchor(node);
      } else {
        this.anchors[node.unique_id] = null;
        if (node instanceof nodes.SequenceNode) {
          ref = node.value;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push(this.anchor_node(item));
          }
          return results;
        } else if (node instanceof nodes.MappingNode) {
          ref1 = node.value;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            ref2 = ref1[j], key = ref2[0], value = ref2[1];
            this.anchor_node(key);
            results1.push(this.anchor_node(value));
          }
          return results1;
        }
      }
    };

    Serializer.prototype.generate_anchor = function(node) {
      return "id" + (util.pad_left(++this.last_anchor_id, '0', 4));
    };

    Serializer.prototype.serialize_node = function(node, parent, index) {
      var alias, default_tag, detected_tag, i, implicit, item, j, key, len, len1, ref, ref1, ref2, value;
      alias = this.anchors[node.unique_id];
      if (node.unique_id in this.serialized_nodes) {
        return this.emit(new events.AliasEvent(alias));
      } else {
        this.serialized_nodes[node.unique_id] = true;
        this.descend_resolver(parent, index);
        if (node instanceof nodes.ScalarNode) {
          detected_tag = this.resolve(nodes.ScalarNode, node.value, [true, false]);
          default_tag = this.resolve(nodes.ScalarNode, node.value, [false, true]);
          implicit = [node.tag === detected_tag, node.tag === default_tag];
          this.emit(new events.ScalarEvent(alias, node.tag, implicit, node.value, void 0, void 0, node.style));
        } else if (node instanceof nodes.SequenceNode) {
          implicit = node.tag === this.resolve(nodes.SequenceNode, node.value, true);
          this.emit(new events.SequenceStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
          ref = node.value;
          for (index = i = 0, len = ref.length; i < len; index = ++i) {
            item = ref[index];
            this.serialize_node(item, node, index);
          }
          this.emit(new events.SequenceEndEvent);
        } else if (node instanceof nodes.MappingNode) {
          implicit = node.tag === this.resolve(nodes.MappingNode, node.value, true);
          this.emit(new events.MappingStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
          ref1 = node.value;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            ref2 = ref1[j], key = ref2[0], value = ref2[1];
            this.serialize_node(key, node, null);
            this.serialize_node(value, node, key);
          }
          this.emit(new events.MappingEndEvent);
        }
        return this.ascend_resolver();
      }
    };

    return Serializer;

  })();

}).call(this);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, nodes,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  nodes = __webpack_require__(13);

  YAMLError = __webpack_require__(12).YAMLError;

  this.RepresenterError = (function(superClass) {
    extend(RepresenterError, superClass);

    function RepresenterError() {
      return RepresenterError.__super__.constructor.apply(this, arguments);
    }

    return RepresenterError;

  })(YAMLError);

  this.BaseRepresenter = (function() {
    BaseRepresenter.prototype.yaml_representers_types = [];

    BaseRepresenter.prototype.yaml_representers_handlers = [];

    BaseRepresenter.prototype.yaml_multi_representers_types = [];

    BaseRepresenter.prototype.yaml_multi_representers_handlers = [];

    BaseRepresenter.add_representer = function(data_type, handler) {
      if (!this.prototype.hasOwnProperty('yaml_representers_types')) {
        this.prototype.yaml_representers_types = [].concat(this.prototype.yaml_representers_types);
      }
      if (!this.prototype.hasOwnProperty('yaml_representers_handlers')) {
        this.prototype.yaml_representers_handlers = [].concat(this.prototype.yaml_representers_handlers);
      }
      this.prototype.yaml_representers_types.push(data_type);
      return this.prototype.yaml_representers_handlers.push(handler);
    };

    BaseRepresenter.add_multi_representer = function(data_type, handler) {
      if (!this.prototype.hasOwnProperty('yaml_multi_representers_types')) {
        this.prototype.yaml_multi_representers_types = [].concat(this.prototype.yaml_multi_representers_types);
      }
      if (!this.prototype.hasOwnProperty('yaml_multi_representers_handlers')) {
        this.prototype.yaml_multi_representers_handlers = [].concat(this.prototype.yaml_multi_representers_handlers);
      }
      this.prototype.yaml_multi_representers_types.push(data_type);
      return this.prototype.yaml_multi_representers_handlers.push(handler);
    };

    function BaseRepresenter(arg) {
      var ref;
      ref = arg != null ? arg : {}, this.default_style = ref.default_style, this.default_flow_style = ref.default_flow_style;
      this.represented_objects = {};
      this.object_keeper = [];
      this.alias_key = null;
    }

    BaseRepresenter.prototype.represent = function(data) {
      var node;
      node = this.represent_data(data);
      this.serialize(node);
      this.represented_objects = {};
      this.object_keeper = [];
      return this.alias_key = null;
    };

    BaseRepresenter.prototype.represent_data = function(data) {
      var data_type, i, j, len, ref, representer, type;
      if (this.ignore_aliases(data)) {
        this.alias_key = null;
      } else if ((i = this.object_keeper.indexOf(data)) !== -1) {
        this.alias_key = i;
        if (this.alias_key in this.represented_objects) {
          return this.represented_objects[this.alias_key];
        }
      } else {
        this.alias_key = this.object_keeper.length;
        this.object_keeper.push(data);
      }
      representer = null;
      data_type = data === null ? 'null' : typeof data;
      if (data_type === 'object') {
        data_type = data.constructor;
      }
      if ((i = this.yaml_representers_types.lastIndexOf(data_type)) !== -1) {
        representer = this.yaml_representers_handlers[i];
      }
      if (representer == null) {
        ref = this.yaml_multi_representers_types;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          type = ref[i];
          if (!(data instanceof type)) {
            continue;
          }
          representer = this.yaml_multi_representers_handlers[i];
          break;
        }
      }
      if (representer == null) {
        if ((i = this.yaml_multi_representers_types.lastIndexOf(void 0)) !== -1) {
          representer = this.yaml_multi_representers_handlers[i];
        } else if ((i = this.yaml_representers_types.lastIndexOf(void 0)) !== -1) {
          representer = this.yaml_representers_handlers[i];
        }
      }
      if (representer != null) {
        return representer.call(this, data);
      } else {
        return new nodes.ScalarNode(null, "" + data);
      }
    };

    BaseRepresenter.prototype.represent_scalar = function(tag, value, style) {
      var node;
      if (style == null) {
        style = this.default_style;
      }
      node = new nodes.ScalarNode(tag, value, null, null, style);
      if (this.alias_key != null) {
        this.represented_objects[this.alias_key] = node;
      }
      return node;
    };

    BaseRepresenter.prototype.represent_sequence = function(tag, sequence, flow_style) {
      var best_style, item, j, len, node, node_item, ref, value;
      value = [];
      node = new nodes.SequenceNode(tag, value, null, null, flow_style);
      if (this.alias_key != null) {
        this.represented_objects[this.alias_key] = node;
      }
      best_style = true;
      for (j = 0, len = sequence.length; j < len; j++) {
        item = sequence[j];
        node_item = this.represent_data(item);
        if (!(node_item instanceof nodes.ScalarNode || node_item.style)) {
          best_style = false;
        }
        value.push(node_item);
      }
      if (flow_style == null) {
        node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
      }
      return node;
    };

    BaseRepresenter.prototype.represent_mapping = function(tag, mapping, flow_style) {
      var best_style, item_key, item_value, node, node_key, node_value, ref, value;
      value = [];
      node = new nodes.MappingNode(tag, value, flow_style);
      if (this.alias_key) {
        this.represented_objects[this.alias_key] = node;
      }
      best_style = true;
      for (item_key in mapping) {
        if (!hasProp.call(mapping, item_key)) continue;
        item_value = mapping[item_key];
        node_key = this.represent_data(item_key);
        node_value = this.represent_data(item_value);
        if (!(node_key instanceof nodes.ScalarNode || node_key.style)) {
          best_style = false;
        }
        if (!(node_value instanceof nodes.ScalarNode || node_value.style)) {
          best_style = false;
        }
        value.push([node_key, node_value]);
      }
      if (!flow_style) {
        node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
      }
      return node;
    };

    BaseRepresenter.prototype.ignore_aliases = function(data) {
      return false;
    };

    return BaseRepresenter;

  })();

  this.Representer = (function(superClass) {
    extend(Representer, superClass);

    function Representer() {
      return Representer.__super__.constructor.apply(this, arguments);
    }

    Representer.prototype.represent_boolean = function(data) {
      return this.represent_scalar('tag:yaml.org,2002:bool', (data ? 'true' : 'false'));
    };

    Representer.prototype.represent_null = function(data) {
      return this.represent_scalar('tag:yaml.org,2002:null', 'null');
    };

    Representer.prototype.represent_number = function(data) {
      var tag, value;
      tag = "tag:yaml.org,2002:" + (data % 1 === 0 ? 'int' : 'float');
      value = data !== data ? '.nan' : data === 2e308 ? '.inf' : data === -2e308 ? '-.inf' : data.toString();
      return this.represent_scalar(tag, value);
    };

    Representer.prototype.represent_string = function(data) {
      return this.represent_scalar('tag:yaml.org,2002:str', data);
    };

    Representer.prototype.represent_array = function(data) {
      return this.represent_sequence('tag:yaml.org,2002:seq', data);
    };

    Representer.prototype.represent_date = function(data) {
      return this.represent_scalar('tag:yaml.org,2002:timestamp', data.toISOString());
    };

    Representer.prototype.represent_object = function(data) {
      return this.represent_mapping('tag:yaml.org,2002:map', data);
    };

    Representer.prototype.represent_undefined = function(data) {
      throw new exports.RepresenterError("cannot represent an onbject: " + data);
    };

    Representer.prototype.ignore_aliases = function(data) {
      var ref;
      if (data == null) {
        return true;
      }
      if ((ref = typeof data) === 'boolean' || ref === 'number' || ref === 'string') {
        return true;
      }
      return false;
    };

    return Representer;

  })(this.BaseRepresenter);

  this.Representer.add_representer('boolean', this.Representer.prototype.represent_boolean);

  this.Representer.add_representer('null', this.Representer.prototype.represent_null);

  this.Representer.add_representer('number', this.Representer.prototype.represent_number);

  this.Representer.add_representer('string', this.Representer.prototype.represent_string);

  this.Representer.add_representer(Array, this.Representer.prototype.represent_array);

  this.Representer.add_representer(Date, this.Representer.prototype.represent_date);

  this.Representer.add_representer(Object, this.Representer.prototype.represent_object);

  this.Representer.add_representer(null, this.Representer.prototype.represent_undefined);

}).call(this);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var YAMLError, nodes, util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  nodes = __webpack_require__(13);

  util = __webpack_require__(15);

  YAMLError = __webpack_require__(12).YAMLError;

  this.ResolverError = (function(superClass) {
    extend(ResolverError, superClass);

    function ResolverError() {
      return ResolverError.__super__.constructor.apply(this, arguments);
    }

    return ResolverError;

  })(YAMLError);

  this.BaseResolver = (function() {
    var DEFAULT_MAPPING_TAG, DEFAULT_SCALAR_TAG, DEFAULT_SEQUENCE_TAG;

    DEFAULT_SCALAR_TAG = 'tag:yaml.org,2002:str';

    DEFAULT_SEQUENCE_TAG = 'tag:yaml.org,2002:seq';

    DEFAULT_MAPPING_TAG = 'tag:yaml.org,2002:map';

    BaseResolver.prototype.yaml_implicit_resolvers = {};

    BaseResolver.prototype.yaml_path_resolvers = {};

    BaseResolver.add_implicit_resolver = function(tag, regexp, first) {
      var base, char, i, len, results;
      if (first == null) {
        first = [null];
      }
      if (!this.prototype.hasOwnProperty('yaml_implicit_resolvers')) {
        this.prototype.yaml_implicit_resolvers = util.extend({}, this.prototype.yaml_implicit_resolvers);
      }
      results = [];
      for (i = 0, len = first.length; i < len; i++) {
        char = first[i];
        results.push(((base = this.prototype.yaml_implicit_resolvers)[char] != null ? base[char] : base[char] = []).push([tag, regexp]));
      }
      return results;
    };

    function BaseResolver() {
      this.resolver_exact_paths = [];
      this.resolver_prefix_paths = [];
    }

    BaseResolver.prototype.descend_resolver = function(current_node, current_index) {
      var depth, exact_paths, i, j, kind, len, len1, path, prefix_paths, ref, ref1, ref2, ref3;
      if (util.is_empty(this.yaml_path_resolvers)) {
        return;
      }
      exact_paths = {};
      prefix_paths = [];
      if (current_node) {
        depth = this.resolver_prefix_paths.length;
        ref = this.resolver_prefix_paths.slice(-1)[0];
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], path = ref1[0], kind = ref1[1];
          if (this.check_resolver_prefix(depth, path, kind, current_node, current_index)) {
            if (path.length > depth) {
              prefix_paths.push([path, kind]);
            } else {
              exact_paths[kind] = this.yaml_path_resolvers[path][kind];
            }
          }
        }
      } else {
        ref2 = this.yaml_path_resolvers;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          ref3 = ref2[j], path = ref3[0], kind = ref3[1];
          if (!path) {
            exact_paths[kind] = this.yaml_path_resolvers[path][kind];
          } else {
            prefix_paths.push([path, kind]);
          }
        }
      }
      this.resolver_exact_paths.push(exact_paths);
      return this.resolver_prefix_paths.push(prefix_paths);
    };

    BaseResolver.prototype.ascend_resolver = function() {
      if (util.is_empty(this.yaml_path_resolvers)) {
        return;
      }
      this.resolver_exact_paths.pop();
      return this.resolver_prefix_paths.pop();
    };

    BaseResolver.prototype.check_resolver_prefix = function(depth, path, kind, current_node, current_index) {
      var index_check, node_check, ref;
      ref = path[depth - 1], node_check = ref[0], index_check = ref[1];
      if (typeof node_check === 'string') {
        if (current_node.tag !== node_check) {
          return;
        }
      } else if (node_check !== null) {
        if (!(current_node instanceof node_check)) {
          return;
        }
      }
      if (index_check === true && current_index !== null) {
        return;
      }
      if ((index_check === false || index_check === null) && current_index === null) {
        return;
      }
      if (typeof index_check === 'string') {
        if (!(current_index instanceof nodes.ScalarNode) && index_check === current_index.value) {
          return;
        }
      } else if (typeof index_check === 'number') {
        if (index_check !== current_index) {
          return;
        }
      }
      return true;
    };

    BaseResolver.prototype.resolve = function(kind, value, implicit) {
      var empty, exact_paths, i, k, len, ref, ref1, ref2, ref3, regexp, resolvers, tag;
      if (kind === nodes.ScalarNode && implicit[0]) {
        if (value === '') {
          resolvers = (ref = this.yaml_implicit_resolvers['']) != null ? ref : [];
        } else {
          resolvers = (ref1 = this.yaml_implicit_resolvers[value[0]]) != null ? ref1 : [];
        }
        resolvers = resolvers.concat((ref2 = this.yaml_implicit_resolvers[null]) != null ? ref2 : []);
        for (i = 0, len = resolvers.length; i < len; i++) {
          ref3 = resolvers[i], tag = ref3[0], regexp = ref3[1];
          if (value.match(regexp)) {
            return tag;
          }
        }
        implicit = implicit[1];
      }
      empty = true;
      for (k in this.yaml_path_resolvers) {
        if ({}[k] == null) {
          empty = false;
        }
      }
      if (!empty) {
        exact_paths = this.resolver_exact_paths.slice(-1)[0];
        if (indexOf.call(exact_paths, kind) >= 0) {
          return exact_paths[kind];
        }
        if (indexOf.call(exact_paths, null) >= 0) {
          return exact_paths[null];
        }
      }
      if (kind === nodes.ScalarNode) {
        return DEFAULT_SCALAR_TAG;
      }
      if (kind === nodes.SequenceNode) {
        return DEFAULT_SEQUENCE_TAG;
      }
      if (kind === nodes.MappingNode) {
        return DEFAULT_MAPPING_TAG;
      }
    };

    return BaseResolver;

  })();

  this.Resolver = (function(superClass) {
    extend(Resolver, superClass);

    function Resolver() {
      return Resolver.__super__.constructor.apply(this, arguments);
    }

    return Resolver;

  })(this.BaseResolver);

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:bool', /^(?:yes|Yes|YES|true|True|TRUE|on|On|ON|no|No|NO|false|False|FALSE|off|Off|OFF)$/, 'yYnNtTfFoO');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:float', /^(?:[-+]?(?:[0-9][0-9_]*)\.[0-9_]*(?:[eE][-+][0-9]+)?|\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/, '-+0123456789.');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:int', /^(?:[-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[0-9a-fA-F_]+|[-+]?0o[0-7_]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)$/, '-+0123456789');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:merge', /^(?:<<)$/, '<');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:null', /^(?:~|null|Null|NULL|)$/, ['~', 'n', 'N', '']);

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:timestamp', /^(?:[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?(?:[Tt]|[\x20\t]+)[0-9][0-9]?:[0-9][0-9]:[0-9][0-9](?:\.[0-9]*)?(?:[\x20\t]*(?:Z|[-+][0-9][0-9]?(?::[0-9][0-9])?))?)$/, '0123456789');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:value', /^(?:=)$/, '=');

  this.Resolver.add_implicit_resolver('tag:yaml.org,2002:yaml', /^(?:!|&|\*)$/, '!&*');

}).call(this);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var composer, constructor, parser, reader, resolver, scanner, util,
    slice = [].slice;

  util = __webpack_require__(15);

  reader = __webpack_require__(23);

  scanner = __webpack_require__(24);

  parser = __webpack_require__(26);

  composer = __webpack_require__(10);

  resolver = __webpack_require__(21);

  constructor = __webpack_require__(14);

  this.make_loader = function(Reader, Scanner, Parser, Composer, Resolver, Constructor) {
    var Loader, components;
    if (Reader == null) {
      Reader = reader.Reader;
    }
    if (Scanner == null) {
      Scanner = scanner.Scanner;
    }
    if (Parser == null) {
      Parser = parser.Parser;
    }
    if (Composer == null) {
      Composer = composer.Composer;
    }
    if (Resolver == null) {
      Resolver = resolver.Resolver;
    }
    if (Constructor == null) {
      Constructor = constructor.Constructor;
    }
    components = [Reader, Scanner, Parser, Composer, Resolver, Constructor];
    return Loader = (function() {
      var component;

      util.extend.apply(util, [Loader.prototype].concat(slice.call((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = components.length; i < len; i++) {
          component = components[i];
          results.push(component.prototype);
        }
        return results;
      })())));

      function Loader(stream) {
        var i, len, ref;
        components[0].call(this, stream);
        ref = components.slice(1);
        for (i = 0, len = ref.length; i < len; i++) {
          component = ref[i];
          component.call(this);
        }
      }

      return Loader;

    })();
  };

  this.Loader = this.make_loader();

}).call(this);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var Mark, YAMLError, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = __webpack_require__(12), Mark = ref.Mark, YAMLError = ref.YAMLError;

  this.ReaderError = (function(superClass) {
    extend(ReaderError, superClass);

    function ReaderError(position1, character1, reason) {
      this.position = position1;
      this.character = character1;
      this.reason = reason;
      ReaderError.__super__.constructor.call(this);
    }

    ReaderError.prototype.toString = function() {
      return "unacceptable character #" + (this.character.charCodeAt(0).toString(16)) + ": " + this.reason + "\n  position " + this.position;
    };

    return ReaderError;

  })(YAMLError);


  /*
  Reader:
    checks if characters are within the allowed range
    add '\x00' to the end
   */

  this.Reader = (function() {
    var NON_PRINTABLE;

    NON_PRINTABLE = /[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uFFFD]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

    function Reader(string) {
      this.string = string;
      this.line = 0;
      this.column = 0;
      this.index = 0;
      this.check_printable();
      this.string += '\x00';
    }

    Reader.prototype.peek = function(index) {
      if (index == null) {
        index = 0;
      }
      return this.string[this.index + index];
    };

    Reader.prototype.prefix = function(length) {
      if (length == null) {
        length = 1;
      }
      return this.string.slice(this.index, this.index + length);
    };

    Reader.prototype.forward = function(length) {
      var char, results;
      if (length == null) {
        length = 1;
      }
      results = [];
      while (length) {
        char = this.string[this.index];
        this.index++;
        if (indexOf.call('\n\x85\u2082\u2029', char) >= 0 || (char === '\r' && this.string[this.index] !== '\n')) {
          this.line++;
          this.column = 0;
        } else {
          this.column++;
        }
        results.push(length--);
      }
      return results;
    };

    Reader.prototype.get_mark = function() {
      return new Mark(this.line, this.column, this.string, this.index);
    };

    Reader.prototype.check_printable = function() {
      var character, match, position;
      match = NON_PRINTABLE.exec(this.string);
      if (match) {
        character = match[0];
        position = (this.string.length - this.index) + match.index;
        throw new exports.ReaderError(position, character, 'special characters are not allowed');
      }
    };

    return Reader;

  })();

}).call(this);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, SimpleKey, tokens, util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  MarkedYAMLError = __webpack_require__(12).MarkedYAMLError;

  tokens = __webpack_require__(25);

  util = __webpack_require__(15);


  /*
  The Scanner throws these.
   */

  this.ScannerError = (function(superClass) {
    extend(ScannerError, superClass);

    function ScannerError() {
      return ScannerError.__super__.constructor.apply(this, arguments);
    }

    return ScannerError;

  })(MarkedYAMLError);


  /*
  Represents a possible simple key.
   */

  SimpleKey = (function() {
    function SimpleKey(token_number1, required1, index, line, column1, mark1) {
      this.token_number = token_number1;
      this.required = required1;
      this.index = index;
      this.line = line;
      this.column = column1;
      this.mark = mark1;
    }

    return SimpleKey;

  })();


  /*
  The Scanner class deals with converting a YAML stream into a token stream.
   */

  this.Scanner = (function() {
    var C_LB, C_NUMBERS, C_WS, ESCAPE_CODES, ESCAPE_REPLACEMENTS;

    C_LB = '\r\n\x85\u2028\u2029';

    C_WS = '\t ';

    C_NUMBERS = '0123456789';

    ESCAPE_REPLACEMENTS = {
      '0': '\x00',
      'a': '\x07',
      'b': '\x08',
      't': '\x09',
      '\t': '\x09',
      'n': '\x0A',
      'v': '\x0B',
      'f': '\x0C',
      'r': '\x0D',
      'e': '\x1B',
      ' ': '\x20',
      '"': '"',
      '\\': '\\',
      'N': '\x85',
      '_': '\xA0',
      'L': '\u2028',
      'P': '\u2029'
    };

    ESCAPE_CODES = {
      'x': 2,
      'u': 4,
      'U': 8
    };


    /*
    Initialise the Scanner
     */

    function Scanner() {
      this.done = false;
      this.flow_level = 0;
      this.tokens = [];
      this.fetch_stream_start();
      this.tokens_taken = 0;
      this.indent = -1;
      this.indents = [];
      this.allow_simple_key = true;
      this.possible_simple_keys = {};
    }


    /*
    Check if the next token is one of the given types.
     */

    Scanner.prototype.check_token = function() {
      var choice, choices, i, len;
      choices = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      while (this.need_more_tokens()) {
        this.fetch_more_tokens();
      }
      if (this.tokens.length !== 0) {
        if (choices.length === 0) {
          return true;
        }
        for (i = 0, len = choices.length; i < len; i++) {
          choice = choices[i];
          if (this.tokens[0] instanceof choice) {
            return true;
          }
        }
      }
      return false;
    };


    /*
    Return the next token, but do not delete it from the queue.
     */

    Scanner.prototype.peek_token = function() {
      while (this.need_more_tokens()) {
        this.fetch_more_tokens();
      }
      if (this.tokens.length !== 0) {
        return this.tokens[0];
      }
    };


    /*
    Return the next token, and remove it from the queue.
     */

    Scanner.prototype.get_token = function() {
      while (this.need_more_tokens()) {
        this.fetch_more_tokens();
      }
      if (this.tokens.length !== 0) {
        this.tokens_taken++;
        return this.tokens.shift();
      }
    };

    Scanner.prototype.need_more_tokens = function() {
      if (this.done) {
        return false;
      }
      if (this.tokens.length === 0) {
        return true;
      }
      this.stale_possible_simple_keys();
      if (this.next_possible_simple_key() === this.tokens_taken) {
        return true;
      }
      return false;
    };

    Scanner.prototype.fetch_more_tokens = function() {
      var char;
      this.scan_to_next_token();
      this.stale_possible_simple_keys();
      this.unwind_indent(this.column);
      char = this.peek();
      if (char === '\x00') {
        return this.fetch_stream_end();
      }
      if (char === '%' && this.check_directive()) {
        return this.fetch_directive();
      }
      if (char === '-' && this.check_document_start()) {
        return this.fetch_document_start();
      }
      if (char === '.' && this.check_document_end()) {
        return this.fetch_document_end();
      }
      if (char === '[') {
        return this.fetch_flow_sequence_start();
      }
      if (char === '{') {
        return this.fetch_flow_mapping_start();
      }
      if (char === ']') {
        return this.fetch_flow_sequence_end();
      }
      if (char === '}') {
        return this.fetch_flow_mapping_end();
      }
      if (char === ',') {
        return this.fetch_flow_entry();
      }
      if (char === '-' && this.check_block_entry()) {
        return this.fetch_block_entry();
      }
      if (char === '?' && this.check_key()) {
        return this.fetch_key();
      }
      if (char === ':' && this.check_value()) {
        return this.fetch_value();
      }
      if (char === '*') {
        return this.fetch_alias();
      }
      if (char === '&') {
        return this.fetch_anchor();
      }
      if (char === '!') {
        return this.fetch_tag();
      }
      if (char === '|' && this.flow_level === 0) {
        return this.fetch_literal();
      }
      if (char === '>' && this.flow_level === 0) {
        return this.fetch_folded();
      }
      if (char === '\'') {
        return this.fetch_single();
      }
      if (char === '"') {
        return this.fetch_double();
      }
      if (this.check_plain()) {
        return this.fetch_plain();
      }
      throw new exports.ScannerError('while scanning for the next token', null, "found character " + char + " that cannot start any token", this.get_mark());
    };


    /*
    Return the number of the nearest possible simple key.
     */

    Scanner.prototype.next_possible_simple_key = function() {
      var key, level, min_token_number, ref;
      min_token_number = null;
      ref = this.possible_simple_keys;
      for (level in ref) {
        if (!hasProp.call(ref, level)) continue;
        key = ref[level];
        if (min_token_number === null || key.token_number < min_token_number) {
          min_token_number = key.token_number;
        }
      }
      return min_token_number;
    };


    /*
    Remove entries that are no longer possible simple keys.  According to the
    YAML spec, simple keys:
      should be limited to a single line
      should be no longer than 1024 characters
    Disabling this procedure will allow simple keys of any length and height
    (may cause problems if indentation is broken though).
     */

    Scanner.prototype.stale_possible_simple_keys = function() {
      var key, level, ref, results;
      ref = this.possible_simple_keys;
      results = [];
      for (level in ref) {
        if (!hasProp.call(ref, level)) continue;
        key = ref[level];
        if (key.line === this.line && this.index - key.index <= 1024) {
          continue;
        }
        if (!key.required) {
          results.push(delete this.possible_simple_keys[level]);
        } else {
          throw new exports.ScannerError('while scanning a simple key', key.mark, 'could not find expected \':\'', this.get_mark());
        }
      }
      return results;
    };


    /*
    The next token may start a simple key.  We check if it's possible and save
    its position.  This function is called for ALIAS, ANCHOR, TAG,
    SCALAR (flow),'[' and '{'.
     */

    Scanner.prototype.save_possible_simple_key = function() {
      var required, token_number;
      required = this.flow_level === 0 && this.indent === this.column;
      if (required && !this.allow_simple_key) {
        throw new Error('logic failure');
      }
      if (!this.allow_simple_key) {
        return;
      }
      this.remove_possible_simple_key();
      token_number = this.tokens_taken + this.tokens.length;
      return this.possible_simple_keys[this.flow_level] = new SimpleKey(token_number, required, this.index, this.line, this.column, this.get_mark());
    };


    /*
    Remove the saved possible simple key at the current flow level.
     */

    Scanner.prototype.remove_possible_simple_key = function() {
      var key;
      if (!(key = this.possible_simple_keys[this.flow_level])) {
        return;
      }
      if (!key.required) {
        return delete this.possible_simple_keys[this.flow_level];
      } else {
        throw new exports.ScannerError('while scanning a simple key', key.mark, 'could not find expected \':\'', this.get_mark());
      }
    };


    /*
    In flow context, tokens should respect indentation.
    Actually the condition should be `self.indent >= column` according to
    the spec. But this condition will prohibit intuitively correct
    constructions such as
      key : {
      }
     */

    Scanner.prototype.unwind_indent = function(column) {
      var mark, results;
      if (this.flow_level !== 0) {
        return;
      }
      results = [];
      while (this.indent > column) {
        mark = this.get_mark();
        this.indent = this.indents.pop();
        results.push(this.tokens.push(new tokens.BlockEndToken(mark, mark)));
      }
      return results;
    };


    /*
    Check if we need to increase indentation.
     */

    Scanner.prototype.add_indent = function(column) {
      if (!(column > this.indent)) {
        return false;
      }
      this.indents.push(this.indent);
      this.indent = column;
      return true;
    };

    Scanner.prototype.fetch_stream_start = function() {
      var mark;
      mark = this.get_mark();
      return this.tokens.push(new tokens.StreamStartToken(mark, mark, this.encoding));
    };

    Scanner.prototype.fetch_stream_end = function() {
      var mark;
      this.unwind_indent(-1);
      this.remove_possible_simple_key();
      this.allow_possible_simple_key = false;
      this.possible_simple_keys = {};
      mark = this.get_mark();
      this.tokens.push(new tokens.StreamEndToken(mark, mark));
      return this.done = true;
    };

    Scanner.prototype.fetch_directive = function() {
      this.unwind_indent(-1);
      this.remove_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_directive());
    };

    Scanner.prototype.fetch_document_start = function() {
      return this.fetch_document_indicator(tokens.DocumentStartToken);
    };

    Scanner.prototype.fetch_document_end = function() {
      return this.fetch_document_indicator(tokens.DocumentEndToken);
    };

    Scanner.prototype.fetch_document_indicator = function(TokenClass) {
      var start_mark;
      this.unwind_indent(-1);
      this.remove_possible_simple_key();
      this.allow_simple_key = false;
      start_mark = this.get_mark();
      this.forward(3);
      return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_flow_sequence_start = function() {
      return this.fetch_flow_collection_start(tokens.FlowSequenceStartToken);
    };

    Scanner.prototype.fetch_flow_mapping_start = function() {
      return this.fetch_flow_collection_start(tokens.FlowMappingStartToken);
    };

    Scanner.prototype.fetch_flow_collection_start = function(TokenClass) {
      var start_mark;
      this.save_possible_simple_key();
      this.flow_level++;
      this.allow_simple_key = true;
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_flow_sequence_end = function() {
      return this.fetch_flow_collection_end(tokens.FlowSequenceEndToken);
    };

    Scanner.prototype.fetch_flow_mapping_end = function() {
      return this.fetch_flow_collection_end(tokens.FlowMappingEndToken);
    };

    Scanner.prototype.fetch_flow_collection_end = function(TokenClass) {
      var start_mark;
      this.remove_possible_simple_key();
      this.flow_level--;
      this.allow_simple_key = false;
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_flow_entry = function() {
      var start_mark;
      this.allow_simple_key = true;
      this.remove_possible_simple_key();
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new tokens.FlowEntryToken(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_block_entry = function() {
      var mark, start_mark;
      if (this.flow_level === 0) {
        if (!this.allow_simple_key) {
          throw new exports.ScannerError(null, null, 'sequence entries are not allowed here', this.get_mark());
        }
        if (this.add_indent(this.column)) {
          mark = this.get_mark();
          this.tokens.push(new tokens.BlockSequenceStartToken(mark, mark));
        }
      }
      this.allow_simple_key = true;
      this.remove_possible_simple_key();
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new tokens.BlockEntryToken(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_key = function() {
      var mark, start_mark;
      if (this.flow_level === 0) {
        if (!this.allow_simple_key) {
          throw new exports.ScannerError(null, null, 'mapping keys are not allowed here', this.get_mark());
        }
        if (this.add_indent(this.column)) {
          mark = this.get_mark();
          this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
        }
      }
      this.allow_simple_key = !this.flow_level;
      this.remove_possible_simple_key();
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new tokens.KeyToken(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_value = function() {
      var key, mark, start_mark;
      if (key = this.possible_simple_keys[this.flow_level]) {
        delete this.possible_simple_keys[this.flow_level];
        this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.KeyToken(key.mark, key.mark));
        if (this.flow_level === 0) {
          if (this.add_indent(key.column)) {
            this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.BlockMappingStartToken(key.mark, key.mark));
          }
        }
        this.allow_simple_key = false;
      } else {
        if (this.flow_level === 0) {
          if (!this.allow_simple_key) {
            throw new exports.ScannerError(null, null, 'mapping values are not allowed here', this.get_mark());
          }
          if (this.add_indent(this.column)) {
            mark = this.get_mark();
            this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
          }
        }
        this.allow_simple_key = !this.flow_level;
        this.remove_possible_simple_key();
      }
      start_mark = this.get_mark();
      this.forward();
      return this.tokens.push(new tokens.ValueToken(start_mark, this.get_mark()));
    };

    Scanner.prototype.fetch_alias = function() {
      this.save_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_anchor(tokens.AliasToken));
    };

    Scanner.prototype.fetch_anchor = function() {
      this.save_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_anchor(tokens.AnchorToken));
    };

    Scanner.prototype.fetch_tag = function() {
      this.save_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_tag());
    };

    Scanner.prototype.fetch_literal = function() {
      return this.fetch_block_scalar('|');
    };

    Scanner.prototype.fetch_folded = function() {
      return this.fetch_block_scalar('>');
    };

    Scanner.prototype.fetch_block_scalar = function(style) {
      this.allow_simple_key = true;
      this.remove_possible_simple_key();
      return this.tokens.push(this.scan_block_scalar(style));
    };

    Scanner.prototype.fetch_single = function() {
      return this.fetch_flow_scalar('\'');
    };

    Scanner.prototype.fetch_double = function() {
      return this.fetch_flow_scalar('"');
    };

    Scanner.prototype.fetch_flow_scalar = function(style) {
      this.save_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_flow_scalar(style));
    };

    Scanner.prototype.fetch_plain = function() {
      this.save_possible_simple_key();
      this.allow_simple_key = false;
      return this.tokens.push(this.scan_plain());
    };


    /*
    DIRECTIVE: ^ '%'
     */

    Scanner.prototype.check_directive = function() {
      if (this.column === 0) {
        return true;
      }
      return false;
    };


    /*
    DOCUMENT-START: ^ '---' (' '|'\n')
     */

    Scanner.prototype.check_document_start = function() {
      var ref;
      if (this.column === 0 && this.prefix(3) === '---' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
        return true;
      }
      return false;
    };


    /*
    DOCUMENT-END: ^ '...' (' '|'\n')
     */

    Scanner.prototype.check_document_end = function() {
      var ref;
      if (this.column === 0 && this.prefix(3) === '...' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
        return true;
      }
      return false;
    };


    /*
    BLOCK-ENTRY: '-' (' '|'\n')
     */

    Scanner.prototype.check_block_entry = function() {
      var ref;
      return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
    };


    /*
    KEY (flow context):  '?'
    KEY (block context): '?' (' '|'\n')
     */

    Scanner.prototype.check_key = function() {
      var ref;
      if (this.flow_level !== 0) {
        return true;
      }
      return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
    };


    /*
    VALUE (flow context):  ':'
    VALUE (block context): ':' (' '|'\n')
     */

    Scanner.prototype.check_value = function() {
      var ref;
      if (this.flow_level !== 0) {
        return true;
      }
      return ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0;
    };


    /*
    A plain scalar may start with any non-space character except:
      '-', '?', ':', ',', '[', ']', '{', '}',
      '#', '&', '*', '!', '|', '>', '\'', '"',
      '%', '@', '`'.
    
    It may also start with
      '-', '?', ':'
    if it is followed by a non-space character.
    
    Note that we limit the last rule to the block context (except the '-'
    character) because we want the flow context to be space independent.
     */

    Scanner.prototype.check_plain = function() {
      var char, ref;
      char = this.peek();
      return indexOf.call(C_LB + C_WS + '\x00-?:,[]{}#&*!|>\'"%@`', char) < 0 || ((ref = this.peek(1), indexOf.call(C_LB + C_WS + '\x00', ref) < 0) && (char === '-' || (this.flow_level === 0 && indexOf.call('?:', char) >= 0)));
    };


    /*
    We ignore spaces, line breaks and comments.
    If we find a line break in the block context, we set the flag
    `allow_simple_key` on.
    The byte order mark is stripped if it's the first character in the stream.
    We do not yet support BOM inside the stream as the specification requires.
    Any such mark will be considered as a part of the document.
    
    TODO: We need to make tab handling rules more sane.  A good rule is
      Tabs cannot precede tokens BLOCK-SEQUENCE-START, BLOCK-MAPPING-START,
      BLOCK-END, KEY (block context), VALUE (block context), BLOCK-ENTRY
    So the tab checking code is
      @allow_simple_key = off if <TAB>
    We also need to add the check for `allow_simple_key is on` to
    `unwind_indent` before issuing BLOCK-END.  Scanners for block, flow and
    plain scalars need to be modified.
     */

    Scanner.prototype.scan_to_next_token = function() {
      var found, ref, results;
      if (this.index === 0 && this.peek() === '\uFEFF') {
        this.forward();
      }
      found = false;
      results = [];
      while (!found) {
        while (this.peek() === ' ') {
          this.forward();
        }
        if (this.peek() === '#') {
          while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
            this.forward();
          }
        }
        if (this.scan_line_break()) {
          if (this.flow_level === 0) {
            results.push(this.allow_simple_key = true);
          } else {
            results.push(void 0);
          }
        } else {
          results.push(found = true);
        }
      }
      return results;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_directive = function() {
      var end_mark, name, ref, start_mark, value;
      start_mark = this.get_mark();
      this.forward();
      name = this.scan_directive_name(start_mark);
      value = null;
      if (name === 'YAML') {
        value = this.scan_yaml_directive_value(start_mark);
        end_mark = this.get_mark();
      } else if (name === 'TAG') {
        value = this.scan_tag_directive_value(start_mark);
        end_mark = this.get_mark();
      } else {
        end_mark = this.get_mark();
        while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
          this.forward();
        }
      }
      this.scan_directive_ignored_line(start_mark);
      return new tokens.DirectiveToken(name, value, start_mark, end_mark);
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_directive_name = function(start_mark) {
      var char, length, value;
      length = 0;
      char = this.peek(length);
      while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
        length++;
        char = this.peek(length);
      }
      if (length === 0) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected alphanumeric or numeric character but found " + char, this.get_mark());
      }
      value = this.prefix(length);
      this.forward(length);
      char = this.peek();
      if (indexOf.call(C_LB + '\x00 ', char) < 0) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected alphanumeric or numeric character but found " + char, this.get_mark());
      }
      return value;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_yaml_directive_value = function(start_mark) {
      var major, minor, ref;
      while (this.peek() === ' ') {
        this.forward();
      }
      major = this.scan_yaml_directive_number(start_mark);
      if (this.peek() !== '.') {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected a digit or '.' but found " + (this.peek()), this.get_mark());
      }
      this.forward();
      minor = this.scan_yaml_directive_number(start_mark);
      if (ref = this.peek(), indexOf.call(C_LB + '\x00 ', ref) < 0) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected a digit or ' ' but found " + (this.peek()), this.get_mark());
      }
      return [major, minor];
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_yaml_directive_number = function(start_mark) {
      var char, length, ref, value;
      char = this.peek();
      if (!(('0' <= char && char <= '9'))) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected a digit but found " + char, this.get_mark());
      }
      length = 0;
      while (('0' <= (ref = this.peek(length)) && ref <= '9')) {
        length++;
      }
      value = parseInt(this.prefix(length));
      this.forward(length);
      return value;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_tag_directive_value = function(start_mark) {
      var handle, prefix;
      while (this.peek() === ' ') {
        this.forward();
      }
      handle = this.scan_tag_directive_handle(start_mark);
      while (this.peek() === ' ') {
        this.forward();
      }
      prefix = this.scan_tag_directive_prefix(start_mark);
      return [handle, prefix];
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_tag_directive_handle = function(start_mark) {
      var char, value;
      value = this.scan_tag_handle('directive', start_mark);
      char = this.peek();
      if (char !== ' ') {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected ' ' but found " + char, this.get_mark());
      }
      return value;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_tag_directive_prefix = function(start_mark) {
      var char, value;
      value = this.scan_tag_uri('directive', start_mark);
      char = this.peek();
      if (indexOf.call(C_LB + '\x00 ', char) < 0) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected ' ' but found " + char, this.get_mark());
      }
      return value;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_directive_ignored_line = function(start_mark) {
      var char, ref;
      while (this.peek() === ' ') {
        this.forward();
      }
      if (this.peek() === '#') {
        while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
          this.forward();
        }
      }
      char = this.peek();
      if (indexOf.call(C_LB + '\x00', char) < 0) {
        throw new exports.ScannerError('while scanning a directive', start_mark, "expected a comment or a line break but found " + char, this.get_mark());
      }
      return this.scan_line_break();
    };


    /*
    The specification does not restrict characters for anchors and aliases.
    This may lead to problems, for instance, the document:
      [ *alias, value ]
    can be interpteted in two ways, as
      [ "value" ]
    and
      [ *alias , "value" ]
    Therefore we restrict aliases to numbers and ASCII letters.
     */

    Scanner.prototype.scan_anchor = function(TokenClass) {
      var char, indicator, length, name, start_mark, value;
      start_mark = this.get_mark();
      indicator = this.peek();
      if (indicator === '*') {
        name = 'alias';
      } else {
        name = 'anchor';
      }
      this.forward();
      length = 0;
      char = this.peek(length);
      while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
        length++;
        char = this.peek(length);
      }
      if (length === 0) {
        throw new exports.ScannerError("while scanning an " + name, start_mark, "expected alphabetic or numeric character but found '" + char + "'", this.get_mark());
      }
      value = this.prefix(length);
      this.forward(length);
      char = this.peek();
      if (indexOf.call(C_LB + C_WS + '\x00' + '?:,]}%@`', char) < 0) {
        throw new exports.ScannerError("while scanning an " + name, start_mark, "expected alphabetic or numeric character but found '" + char + "'", this.get_mark());
      }
      return new TokenClass(value, start_mark, this.get_mark());
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_tag = function() {
      var char, handle, length, start_mark, suffix, use_handle;
      start_mark = this.get_mark();
      char = this.peek(1);
      if (char === '<') {
        handle = null;
        this.forward(2);
        suffix = this.scan_tag_uri('tag', start_mark);
        if (this.peek() !== '>') {
          throw new exports.ScannerError('while parsing a tag', start_mark, "expected '>' but found " + (this.peek()), this.get_mark());
        }
        this.forward();
      } else if (indexOf.call(C_LB + C_WS + '\x00', char) >= 0) {
        handle = null;
        suffix = '!';
        this.forward();
      } else {
        length = 1;
        use_handle = false;
        while (indexOf.call(C_LB + '\x00 ', char) < 0) {
          if (char === '!') {
            use_handle = true;
            break;
          }
          length++;
          char = this.peek(length);
        }
        if (use_handle) {
          handle = this.scan_tag_handle('tag', start_mark);
        } else {
          handle = '!';
          this.forward();
        }
        suffix = this.scan_tag_uri('tag', start_mark);
      }
      char = this.peek();
      if (indexOf.call(C_LB + '\x00 ', char) < 0) {
        throw new exports.ScannerError('while scanning a tag', start_mark, "expected ' ' but found " + char, this.get_mark());
      }
      return new tokens.TagToken([handle, suffix], start_mark, this.get_mark());
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_block_scalar = function(style) {
      var breaks, chomping, chunks, end_mark, folded, increment, indent, leading_non_space, length, line_break, max_indent, min_indent, ref, ref1, ref2, ref3, ref4, ref5, ref6, start_mark;
      folded = style === '>';
      chunks = [];
      start_mark = this.get_mark();
      this.forward();
      ref = this.scan_block_scalar_indicators(start_mark), chomping = ref[0], increment = ref[1];
      this.scan_block_scalar_ignored_line(start_mark);
      min_indent = this.indent + 1;
      if (min_indent < 1) {
        min_indent = 1;
      }
      if (increment == null) {
        ref1 = this.scan_block_scalar_indentation(), breaks = ref1[0], max_indent = ref1[1], end_mark = ref1[2];
        indent = Math.max(min_indent, max_indent);
      } else {
        indent = min_indent + increment - 1;
        ref2 = this.scan_block_scalar_breaks(indent), breaks = ref2[0], end_mark = ref2[1];
      }
      line_break = '';
      while (this.column === indent && this.peek() !== '\x00') {
        chunks = chunks.concat(breaks);
        leading_non_space = (ref3 = this.peek(), indexOf.call(' \t', ref3) < 0);
        length = 0;
        while (ref4 = this.peek(length), indexOf.call(C_LB + '\x00', ref4) < 0) {
          length++;
        }
        chunks.push(this.prefix(length));
        this.forward(length);
        line_break = this.scan_line_break();
        ref5 = this.scan_block_scalar_breaks(indent), breaks = ref5[0], end_mark = ref5[1];
        if (this.column === indent && this.peek() !== '\x00') {
          if (folded && line_break === '\n' && leading_non_space && (ref6 = this.peek(), indexOf.call(' \t', ref6) < 0)) {
            if (util.is_empty(breaks)) {
              chunks.push(' ');
            }
          } else {
            chunks.push(line_break);
          }
        } else {
          break;
        }
      }
      if (chomping !== false) {
        chunks.push(line_break);
      }
      if (chomping === true) {
        chunks = chunks.concat(breaks);
      }
      return new tokens.ScalarToken(chunks.join(''), false, start_mark, end_mark, style);
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_block_scalar_indicators = function(start_mark) {
      var char, chomping, increment;
      chomping = null;
      increment = null;
      char = this.peek();
      if (indexOf.call('+-', char) >= 0) {
        chomping = char === '+';
        this.forward();
        char = this.peek();
        if (indexOf.call(C_NUMBERS, char) >= 0) {
          increment = parseInt(char);
          if (increment === 0) {
            throw new exports.ScannerError('while scanning a block scalar', start_mark, 'expected indentation indicator in the range 1-9 but found 0', this.get_mark());
          }
          this.forward();
        }
      } else if (indexOf.call(C_NUMBERS, char) >= 0) {
        increment = parseInt(char);
        if (increment === 0) {
          throw new exports.ScannerError('while scanning a block scalar', start_mark, 'expected indentation indicator in the range 1-9 but found 0', this.get_mark());
        }
        this.forward();
        char = this.peek();
        if (indexOf.call('+-', char) >= 0) {
          chomping = char === '+';
          this.forward();
        }
      }
      char = this.peek();
      if (indexOf.call(C_LB + '\x00 ', char) < 0) {
        throw new exports.ScannerError('while scanning a block scalar', start_mark, "expected chomping or indentation indicators, but found " + char, this.get_mark());
      }
      return [chomping, increment];
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_block_scalar_ignored_line = function(start_mark) {
      var char, ref;
      while (this.peek() === ' ') {
        this.forward();
      }
      if (this.peek() === '#') {
        while (ref = this.peek(), indexOf.call(C_LB + '\x00', ref) < 0) {
          this.forward();
        }
      }
      char = this.peek();
      if (indexOf.call(C_LB + '\x00', char) < 0) {
        throw new exports.ScannerError('while scanning a block scalar', start_mark, "expected a comment or a line break but found " + char, this.get_mark());
      }
      return this.scan_line_break();
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_block_scalar_indentation = function() {
      var chunks, end_mark, max_indent, ref;
      chunks = [];
      max_indent = 0;
      end_mark = this.get_mark();
      while (ref = this.peek(), indexOf.call(C_LB + ' ', ref) >= 0) {
        if (this.peek() !== ' ') {
          chunks.push(this.scan_line_break());
          end_mark = this.get_mark();
        } else {
          this.forward();
          if (this.column > max_indent) {
            max_indent = this.column;
          }
        }
      }
      return [chunks, max_indent, end_mark];
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_block_scalar_breaks = function(indent) {
      var chunks, end_mark, ref;
      chunks = [];
      end_mark = this.get_mark();
      while (this.column < indent && this.peek() === ' ') {
        this.forward();
      }
      while (ref = this.peek(), indexOf.call(C_LB, ref) >= 0) {
        chunks.push(this.scan_line_break());
        end_mark = this.get_mark();
        while (this.column < indent && this.peek() === ' ') {
          this.forward();
        }
      }
      return [chunks, end_mark];
    };


    /*
    See the specification for details.
    Note that we loose indentation rules for quoted scalars. Quoted scalars
    don't need to adhere indentation because " and ' clearly mark the beginning
    and the end of them. Therefore we are less restrictive than the
    specification requires. We only need to check that document separators are
    not included in scalars.
     */

    Scanner.prototype.scan_flow_scalar = function(style) {
      var chunks, double, quote, start_mark;
      double = style === '"';
      chunks = [];
      start_mark = this.get_mark();
      quote = this.peek();
      this.forward();
      chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
      while (this.peek() !== quote) {
        chunks = chunks.concat(this.scan_flow_scalar_spaces(double, start_mark));
        chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
      }
      this.forward();
      return new tokens.ScalarToken(chunks.join(''), false, start_mark, this.get_mark(), style);
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_flow_scalar_non_spaces = function(double, start_mark) {
      var char, chunks, code, i, k, length, ref, ref1, ref2;
      chunks = [];
      while (true) {
        length = 0;
        while (ref = this.peek(length), indexOf.call(C_LB + C_WS + '\'"\\\x00', ref) < 0) {
          length++;
        }
        if (length !== 0) {
          chunks.push(this.prefix(length));
          this.forward(length);
        }
        char = this.peek();
        if (!double && char === '\'' && this.peek(1) === '\'') {
          chunks.push('\'');
          this.forward(2);
        } else if ((double && char === '\'') || (!double && indexOf.call('"\\', char) >= 0)) {
          chunks.push(char);
          this.forward();
        } else if (double && char === '\\') {
          this.forward();
          char = this.peek();
          if (char in ESCAPE_REPLACEMENTS) {
            chunks.push(ESCAPE_REPLACEMENTS[char]);
            this.forward();
          } else if (char in ESCAPE_CODES) {
            length = ESCAPE_CODES[char];
            this.forward();
            for (k = i = 0, ref1 = length; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
              if (ref2 = this.peek(k), indexOf.call(C_NUMBERS + "ABCDEFabcdef", ref2) < 0) {
                throw new exports.ScannerError('while scanning a double-quoted scalar', start_mark, "expected escape sequence of " + length + " hexadecimal numbers, but found " + (this.peek(k)), this.get_mark());
              }
            }
            code = parseInt(this.prefix(length), 16);
            chunks.push(String.fromCharCode(code));
            this.forward(length);
          } else if (indexOf.call(C_LB, char) >= 0) {
            this.scan_line_break();
            chunks = chunks.concat(this.scan_flow_scalar_breaks(double, start_mark));
          } else {
            throw new exports.ScannerError('while scanning a double-quoted scalar', start_mark, "found unknown escape character " + char, this.get_mark());
          }
        } else {
          return chunks;
        }
      }
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_flow_scalar_spaces = function(double, start_mark) {
      var breaks, char, chunks, length, line_break, ref, whitespaces;
      chunks = [];
      length = 0;
      while (ref = this.peek(length), indexOf.call(C_WS, ref) >= 0) {
        length++;
      }
      whitespaces = this.prefix(length);
      this.forward(length);
      char = this.peek();
      if (char === '\x00') {
        throw new exports.ScannerError('while scanning a quoted scalar', start_mark, 'found unexpected end of stream', this.get_mark());
      }
      if (indexOf.call(C_LB, char) >= 0) {
        line_break = this.scan_line_break();
        breaks = this.scan_flow_scalar_breaks(double, start_mark);
        if (line_break !== '\n') {
          chunks.push(line_break);
        } else if (breaks.length === 0) {
          chunks.push(' ');
        }
        chunks = chunks.concat(breaks);
      } else {
        chunks.push(whitespaces);
      }
      return chunks;
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_flow_scalar_breaks = function(double, start_mark) {
      var chunks, prefix, ref, ref1, ref2;
      chunks = [];
      while (true) {
        prefix = this.prefix(3);
        if (prefix === '---' || prefix === '...' && (ref = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) {
          throw new exports.ScannerError('while scanning a quoted scalar', start_mark, 'found unexpected document separator', this.get_mark());
        }
        while (ref1 = this.peek(), indexOf.call(C_WS, ref1) >= 0) {
          this.forward();
        }
        if (ref2 = this.peek(), indexOf.call(C_LB, ref2) >= 0) {
          chunks.push(this.scan_line_break());
        } else {
          return chunks;
        }
      }
    };


    /*
    See the specification for details.
    We add an additional restriction for the flow context:
      plain scalars in the flow context cannot contain ',', ':' and '?'.
    We also keep track of the `allow_simple_key` flag here.
    Indentation rules are loosed for the flow context.
     */

    Scanner.prototype.scan_plain = function() {
      var char, chunks, end_mark, indent, length, ref, ref1, spaces, start_mark;
      chunks = [];
      start_mark = end_mark = this.get_mark();
      indent = this.indent + 1;
      spaces = [];
      while (true) {
        length = 0;
        if (this.peek() === '#') {
          break;
        }
        while (true) {
          char = this.peek(length);
          if (indexOf.call(C_LB + C_WS + '\x00', char) >= 0 || (this.flow_level === 0 && char === ':' && (ref = this.peek(length + 1), indexOf.call(C_LB + C_WS + '\x00', ref) >= 0)) || (this.flow_level !== 0 && indexOf.call(',:?[]{}', char) >= 0)) {
            break;
          }
          length++;
        }
        if (this.flow_level !== 0 && char === ':' && (ref1 = this.peek(length + 1), indexOf.call(C_LB + C_WS + '\x00,[]{}', ref1) < 0)) {
          this.forward(length);
          throw new exports.ScannerError('while scanning a plain scalar', start_mark, 'found unexpected \':\'', this.get_mark(), 'Please check http://pyyaml.org/wiki/YAMLColonInFlowContext');
        }
        if (length === 0) {
          break;
        }
        this.allow_simple_key = false;
        chunks = chunks.concat(spaces);
        chunks.push(this.prefix(length));
        this.forward(length);
        end_mark = this.get_mark();
        spaces = this.scan_plain_spaces(indent, start_mark);
        if ((spaces == null) || spaces.length === 0 || this.peek() === '#' || (this.flow_level === 0 && this.column < indent)) {
          break;
        }
      }
      return new tokens.ScalarToken(chunks.join(''), true, start_mark, end_mark);
    };


    /*
    See the specification for details.
    The specification is really confusing about tabs in plain scalars.
    We just forbid them completely. Do not use tabs in YAML!
     */

    Scanner.prototype.scan_plain_spaces = function(indent, start_mark) {
      var breaks, char, chunks, length, line_break, prefix, ref, ref1, ref2, ref3, whitespaces;
      chunks = [];
      length = 0;
      while (ref = this.peek(length), indexOf.call(' ', ref) >= 0) {
        length++;
      }
      whitespaces = this.prefix(length);
      this.forward(length);
      char = this.peek();
      if (indexOf.call(C_LB, char) >= 0) {
        line_break = this.scan_line_break();
        this.allow_simple_key = true;
        prefix = this.prefix(3);
        if (prefix === '---' || prefix === '...' && (ref1 = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref1) >= 0)) {
          return;
        }
        breaks = [];
        while (ref3 = this.peek(), indexOf.call(C_LB + ' ', ref3) >= 0) {
          if (this.peek() === ' ') {
            this.forward();
          } else {
            breaks.push(this.scan_line_break());
            prefix = this.prefix(3);
            if (prefix === '---' || prefix === '...' && (ref2 = this.peek(3), indexOf.call(C_LB + C_WS + '\x00', ref2) >= 0)) {
              return;
            }
          }
        }
        if (line_break !== '\n') {
          chunks.push(line_break);
        } else if (breaks.length === 0) {
          chunks.push(' ');
        }
        chunks = chunks.concat(breaks);
      } else if (whitespaces) {
        chunks.push(whitespaces);
      }
      return chunks;
    };


    /*
    See the specification for details.
    For some strange reasons, the specification does not allow '_' in tag
    handles. I have allowed it anyway.
     */

    Scanner.prototype.scan_tag_handle = function(name, start_mark) {
      var char, length, value;
      char = this.peek();
      if (char !== '!') {
        throw new exports.ScannerError("while scanning a " + name, start_mark, "expected '!' but found " + char, this.get_mark());
      }
      length = 1;
      char = this.peek(length);
      if (char !== ' ') {
        while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-_', char) >= 0) {
          length++;
          char = this.peek(length);
        }
        if (char !== '!') {
          this.forward(length);
          throw new exports.ScannerError("while scanning a " + name, start_mark, "expected '!' but found " + char, this.get_mark());
        }
        length++;
      }
      value = this.prefix(length);
      this.forward(length);
      return value;
    };


    /*
    See the specification for details.
    Note: we do not check if URI is well-formed.
     */

    Scanner.prototype.scan_tag_uri = function(name, start_mark) {
      var char, chunks, length;
      chunks = [];
      length = 0;
      char = this.peek(length);
      while (('0' <= char && char <= '9') || ('A' <= char && char <= 'Z') || ('a' <= char && char <= 'z') || indexOf.call('-;/?:@&=+$,_.!~*\'()[]%', char) >= 0) {
        if (char === '%') {
          chunks.push(this.prefix(length));
          this.forward(length);
          length = 0;
          chunks.push(this.scan_uri_escapes(name, start_mark));
        } else {
          length++;
        }
        char = this.peek(length);
      }
      if (length !== 0) {
        chunks.push(this.prefix(length));
        this.forward(length);
        length = 0;
      }
      if (chunks.length === 0) {
        throw new exports.ScannerError("while parsing a " + name, start_mark, "expected URI but found " + char, this.get_mark());
      }
      return chunks.join('');
    };


    /*
    See the specification for details.
     */

    Scanner.prototype.scan_uri_escapes = function(name, start_mark) {
      var bytes, i, k, mark;
      bytes = [];
      mark = this.get_mark();
      while (this.peek() === '%') {
        this.forward();
        for (k = i = 0; i <= 2; k = ++i) {
          throw new exports.ScannerError("while scanning a " + name, start_mark, "expected URI escape sequence of 2 hexadecimal numbers but found " + (this.peek(k)), this.get_mark());
        }
        bytes.push(String.fromCharCode(parseInt(this.prefix(2), 16)));
        this.forward(2);
      }
      return bytes.join('');
    };


    /*
    Transforms:
      '\r\n'      :   '\n'
      '\r'        :   '\n'
      '\n'        :   '\n'
      '\x85'      :   '\n'
      '\u2028'    :   '\u2028'
      '\u2029     :   '\u2029'
      default     :   ''
     */

    Scanner.prototype.scan_line_break = function() {
      var char;
      char = this.peek();
      if (indexOf.call('\r\n\x85', char) >= 0) {
        if (this.prefix(2) === '\r\n') {
          this.forward(2);
        } else {
          this.forward();
        }
        return '\n';
      } else if (indexOf.call('\u2028\u2029', char) >= 0) {
        this.forward();
        return char;
      }
      return '';
    };

    return Scanner;

  })();

}).call(this);


/***/ }),
/* 25 */
/***/ (function(module, exports) {

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Token = (function() {
    function Token(start_mark, end_mark) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return Token;

  })();

  this.DirectiveToken = (function(superClass) {
    extend(DirectiveToken, superClass);

    DirectiveToken.prototype.id = '<directive>';

    function DirectiveToken(name, value, start_mark, end_mark) {
      this.name = name;
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return DirectiveToken;

  })(this.Token);

  this.DocumentStartToken = (function(superClass) {
    extend(DocumentStartToken, superClass);

    function DocumentStartToken() {
      return DocumentStartToken.__super__.constructor.apply(this, arguments);
    }

    DocumentStartToken.prototype.id = '<document start>';

    return DocumentStartToken;

  })(this.Token);

  this.DocumentEndToken = (function(superClass) {
    extend(DocumentEndToken, superClass);

    function DocumentEndToken() {
      return DocumentEndToken.__super__.constructor.apply(this, arguments);
    }

    DocumentEndToken.prototype.id = '<document end>';

    return DocumentEndToken;

  })(this.Token);

  this.StreamStartToken = (function(superClass) {
    extend(StreamStartToken, superClass);

    StreamStartToken.prototype.id = '<stream start>';

    function StreamStartToken(start_mark, end_mark, encoding) {
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.encoding = encoding;
    }

    return StreamStartToken;

  })(this.Token);

  this.StreamEndToken = (function(superClass) {
    extend(StreamEndToken, superClass);

    function StreamEndToken() {
      return StreamEndToken.__super__.constructor.apply(this, arguments);
    }

    StreamEndToken.prototype.id = '<stream end>';

    return StreamEndToken;

  })(this.Token);

  this.BlockSequenceStartToken = (function(superClass) {
    extend(BlockSequenceStartToken, superClass);

    function BlockSequenceStartToken() {
      return BlockSequenceStartToken.__super__.constructor.apply(this, arguments);
    }

    BlockSequenceStartToken.prototype.id = '<block sequence start>';

    return BlockSequenceStartToken;

  })(this.Token);

  this.BlockMappingStartToken = (function(superClass) {
    extend(BlockMappingStartToken, superClass);

    function BlockMappingStartToken() {
      return BlockMappingStartToken.__super__.constructor.apply(this, arguments);
    }

    BlockMappingStartToken.prototype.id = '<block mapping end>';

    return BlockMappingStartToken;

  })(this.Token);

  this.BlockEndToken = (function(superClass) {
    extend(BlockEndToken, superClass);

    function BlockEndToken() {
      return BlockEndToken.__super__.constructor.apply(this, arguments);
    }

    BlockEndToken.prototype.id = '<block end>';

    return BlockEndToken;

  })(this.Token);

  this.FlowSequenceStartToken = (function(superClass) {
    extend(FlowSequenceStartToken, superClass);

    function FlowSequenceStartToken() {
      return FlowSequenceStartToken.__super__.constructor.apply(this, arguments);
    }

    FlowSequenceStartToken.prototype.id = '[';

    return FlowSequenceStartToken;

  })(this.Token);

  this.FlowMappingStartToken = (function(superClass) {
    extend(FlowMappingStartToken, superClass);

    function FlowMappingStartToken() {
      return FlowMappingStartToken.__super__.constructor.apply(this, arguments);
    }

    FlowMappingStartToken.prototype.id = '{';

    return FlowMappingStartToken;

  })(this.Token);

  this.FlowSequenceEndToken = (function(superClass) {
    extend(FlowSequenceEndToken, superClass);

    function FlowSequenceEndToken() {
      return FlowSequenceEndToken.__super__.constructor.apply(this, arguments);
    }

    FlowSequenceEndToken.prototype.id = ']';

    return FlowSequenceEndToken;

  })(this.Token);

  this.FlowMappingEndToken = (function(superClass) {
    extend(FlowMappingEndToken, superClass);

    function FlowMappingEndToken() {
      return FlowMappingEndToken.__super__.constructor.apply(this, arguments);
    }

    FlowMappingEndToken.prototype.id = '}';

    return FlowMappingEndToken;

  })(this.Token);

  this.KeyToken = (function(superClass) {
    extend(KeyToken, superClass);

    function KeyToken() {
      return KeyToken.__super__.constructor.apply(this, arguments);
    }

    KeyToken.prototype.id = '?';

    return KeyToken;

  })(this.Token);

  this.ValueToken = (function(superClass) {
    extend(ValueToken, superClass);

    function ValueToken() {
      return ValueToken.__super__.constructor.apply(this, arguments);
    }

    ValueToken.prototype.id = ':';

    return ValueToken;

  })(this.Token);

  this.BlockEntryToken = (function(superClass) {
    extend(BlockEntryToken, superClass);

    function BlockEntryToken() {
      return BlockEntryToken.__super__.constructor.apply(this, arguments);
    }

    BlockEntryToken.prototype.id = '-';

    return BlockEntryToken;

  })(this.Token);

  this.FlowEntryToken = (function(superClass) {
    extend(FlowEntryToken, superClass);

    function FlowEntryToken() {
      return FlowEntryToken.__super__.constructor.apply(this, arguments);
    }

    FlowEntryToken.prototype.id = ',';

    return FlowEntryToken;

  })(this.Token);

  this.AliasToken = (function(superClass) {
    extend(AliasToken, superClass);

    AliasToken.prototype.id = '<alias>';

    function AliasToken(value, start_mark, end_mark) {
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return AliasToken;

  })(this.Token);

  this.AnchorToken = (function(superClass) {
    extend(AnchorToken, superClass);

    AnchorToken.prototype.id = '<anchor>';

    function AnchorToken(value, start_mark, end_mark) {
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return AnchorToken;

  })(this.Token);

  this.TagToken = (function(superClass) {
    extend(TagToken, superClass);

    TagToken.prototype.id = '<tag>';

    function TagToken(value, start_mark, end_mark) {
      this.value = value;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
    }

    return TagToken;

  })(this.Token);

  this.ScalarToken = (function(superClass) {
    extend(ScalarToken, superClass);

    ScalarToken.prototype.id = '<scalar>';

    function ScalarToken(value, plain, start_mark, end_mark, style) {
      this.value = value;
      this.plain = plain;
      this.start_mark = start_mark;
      this.end_mark = end_mark;
      this.style = style;
    }

    return ScalarToken;

  })(this.Token);

}).call(this);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var MarkedYAMLError, events, tokens,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  events = __webpack_require__(11);

  MarkedYAMLError = __webpack_require__(12).MarkedYAMLError;

  tokens = __webpack_require__(25);

  this.ParserError = (function(superClass) {
    extend(ParserError, superClass);

    function ParserError() {
      return ParserError.__super__.constructor.apply(this, arguments);
    }

    return ParserError;

  })(MarkedYAMLError);

  this.Parser = (function() {
    var DEFAULT_TAGS;

    DEFAULT_TAGS = {
      '!': '!',
      '!!': 'tag:yaml.org,2002:'
    };

    function Parser() {
      this.current_event = null;
      this.yaml_version = null;
      this.tag_handles = {};
      this.states = [];
      this.marks = [];
      this.state = 'parse_stream_start';
    }


    /*
    Reset the state attributes.
     */

    Parser.prototype.dispose = function() {
      this.states = [];
      return this.state = null;
    };


    /*
    Check the type of the next event.
     */

    Parser.prototype.check_event = function() {
      var choice, choices, i, len;
      choices = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.current_event === null) {
        if (this.state != null) {
          this.current_event = this[this.state]();
        }
      }
      if (this.current_event !== null) {
        if (choices.length === 0) {
          return true;
        }
        for (i = 0, len = choices.length; i < len; i++) {
          choice = choices[i];
          if (this.current_event instanceof choice) {
            return true;
          }
        }
      }
      return false;
    };


    /*
    Get the next event.
     */

    Parser.prototype.peek_event = function() {
      if (this.current_event === null && (this.state != null)) {
        this.current_event = this[this.state]();
      }
      return this.current_event;
    };


    /*
    Get the event and proceed further.
     */

    Parser.prototype.get_event = function() {
      var event;
      if (this.current_event === null && (this.state != null)) {
        this.current_event = this[this.state]();
      }
      event = this.current_event;
      this.current_event = null;
      return event;
    };


    /*
    Parse the stream start.
     */

    Parser.prototype.parse_stream_start = function() {
      var event, token;
      token = this.get_token();
      event = new events.StreamStartEvent(token.start_mark, token.end_mark);
      this.state = 'parse_implicit_document_start';
      return event;
    };


    /*
    Parse an implicit document.
     */

    Parser.prototype.parse_implicit_document_start = function() {
      var end_mark, event, start_mark, token;
      if (!this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.StreamEndToken)) {
        this.tag_handles = DEFAULT_TAGS;
        token = this.peek_token();
        start_mark = end_mark = token.start_mark;
        event = new events.DocumentStartEvent(start_mark, end_mark, false);
        this.states.push('parse_document_end');
        this.state = 'parse_block_node';
        return event;
      } else {
        return this.parse_document_start();
      }
    };


    /*
    Parse an explicit document.
     */

    Parser.prototype.parse_document_start = function() {
      var end_mark, event, ref, start_mark, tags, token, version;
      while (this.check_token(tokens.DocumentEndToken)) {
        this.get_token();
      }
      if (!this.check_token(tokens.StreamEndToken)) {
        start_mark = this.peek_token().start_mark;
        ref = this.process_directives(), version = ref[0], tags = ref[1];
        if (!this.check_token(tokens.DocumentStartToken)) {
          throw new exports.ParserError("expected '<document start>', but found " + (this.peek_token().id), this.peek_token().start_mark);
        }
        token = this.get_token();
        end_mark = token.end_mark;
        event = new events.DocumentStartEvent(start_mark, end_mark, true, version, tags);
        this.states.push('parse_document_end');
        this.state = 'parse_document_content';
      } else {
        token = this.get_token();
        event = new events.StreamEndEvent(token.start_mark, token.end_mark);
        if (this.states.length !== 0) {
          throw new Error('assertion error, states should be empty');
        }
        if (this.marks.length !== 0) {
          throw new Error('assertion error, marks should be empty');
        }
        this.state = null;
      }
      return event;
    };


    /*
    Parse the document end.
     */

    Parser.prototype.parse_document_end = function() {
      var end_mark, event, explicit, start_mark, token;
      token = this.peek_token();
      start_mark = end_mark = token.start_mark;
      explicit = false;
      if (this.check_token(tokens.DocumentEndToken)) {
        token = this.get_token();
        end_mark = token.end_mark;
        explicit = true;
      }
      event = new events.DocumentEndEvent(start_mark, end_mark, explicit);
      this.state = 'parse_document_start';
      return event;
    };

    Parser.prototype.parse_document_content = function() {
      var event;
      if (this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.DocumentEndToken, tokens.StreamEndToken)) {
        event = this.process_empty_scalar(this.peek_token().start_mark);
        this.state = this.states.pop();
        return event;
      } else {
        return this.parse_block_node();
      }
    };

    Parser.prototype.process_directives = function() {
      var handle, major, minor, prefix, ref, ref1, ref2, tag_handles_copy, token, value;
      this.yaml_version = null;
      this.tag_handles = {};
      while (this.check_token(tokens.DirectiveToken)) {
        token = this.get_token();
        if (token.name === 'YAML') {
          if (this.yaml_version !== null) {
            throw new exports.ParserError(null, null, 'found duplicate YAML directive', token.start_mark);
          }
          ref = token.value, major = ref[0], minor = ref[1];
          if (major !== 1) {
            throw new exports.ParserError(null, null, 'found incompatible YAML document (version 1.* is required)', token.start_mark);
          }
          this.yaml_version = token.value;
        } else if (token.name === 'TAG') {
          ref1 = token.value, handle = ref1[0], prefix = ref1[1];
          if (handle in this.tag_handles) {
            throw new exports.ParserError(null, null, "duplicate tag handle " + handle, token.start_mark);
          }
          this.tag_handles[handle] = prefix;
        }
      }
      tag_handles_copy = null;
      ref2 = this.tag_handles;
      for (handle in ref2) {
        if (!hasProp.call(ref2, handle)) continue;
        prefix = ref2[handle];
        if (tag_handles_copy == null) {
          tag_handles_copy = {};
        }
        tag_handles_copy[handle] = prefix;
      }
      value = [this.yaml_version, tag_handles_copy];
      for (handle in DEFAULT_TAGS) {
        if (!hasProp.call(DEFAULT_TAGS, handle)) continue;
        prefix = DEFAULT_TAGS[handle];
        if (!(prefix in this.tag_handles)) {
          this.tag_handles[handle] = prefix;
        }
      }
      return value;
    };

    Parser.prototype.parse_block_node = function() {
      return this.parse_node(true);
    };

    Parser.prototype.parse_flow_node = function() {
      return this.parse_node();
    };

    Parser.prototype.parse_block_node_or_indentless_sequence = function() {
      return this.parse_node(true, true);
    };

    Parser.prototype.parse_node = function(block, indentless_sequence) {
      var anchor, end_mark, event, handle, implicit, node, start_mark, suffix, tag, tag_mark, token;
      if (block == null) {
        block = false;
      }
      if (indentless_sequence == null) {
        indentless_sequence = false;
      }
      if (this.check_token(tokens.AliasToken)) {
        token = this.get_token();
        event = new events.AliasEvent(token.value, token.start_mark, token.end_mark);
        this.state = this.states.pop();
      } else {
        anchor = null;
        tag = null;
        start_mark = end_mark = tag_mark = null;
        if (this.check_token(tokens.AnchorToken)) {
          token = this.get_token();
          start_mark = token.start_mark;
          end_mark = token.end_mark;
          anchor = token.value;
          if (this.check_token(tokens.TagToken)) {
            token = this.get_token();
            tag_mark = token.start_mark;
            end_mark = token.end_mark;
            tag = token.value;
          }
        } else if (this.check_token(tokens.TagToken)) {
          token = this.get_token();
          start_mark = tag_mark = token.start_mark;
          end_mark = token.end_mark;
          tag = token.value;
          if (this.check_token(tokens.AnchorToken)) {
            token = this.get_token();
            end_mark = token.end_mark;
            anchor = token.value;
          }
        }
        if (tag !== null) {
          handle = tag[0], suffix = tag[1];
          if (handle !== null) {
            if (!(handle in this.tag_handles)) {
              throw new exports.ParserError('while parsing a node', start_mark, "found undefined tag handle " + handle, tag_mark);
            }
            tag = this.tag_handles[handle] + suffix;
          } else {
            tag = suffix;
          }
        }
        if (start_mark === null) {
          start_mark = end_mark = this.peek_token().start_mark;
        }
        event = null;
        implicit = tag === null || tag === '!';
        if (indentless_sequence && this.check_token(tokens.BlockEntryToken)) {
          end_mark = this.peek_token().end_mark;
          event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark);
          this.state = 'parse_indentless_sequence_entry';
        } else {
          if (this.check_token(tokens.ScalarToken)) {
            token = this.get_token();
            end_mark = token.end_mark;
            if ((token.plain && tag === null) || tag === '!') {
              implicit = [true, false];
            } else if (tag === null) {
              implicit = [false, true];
            } else {
              implicit = [false, false];
            }
            event = new events.ScalarEvent(anchor, tag, implicit, token.value, start_mark, end_mark, token.style);
            this.state = this.states.pop();
          } else if (this.check_token(tokens.FlowSequenceStartToken)) {
            end_mark = this.peek_token().end_mark;
            event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
            this.state = 'parse_flow_sequence_first_entry';
          } else if (this.check_token(tokens.FlowMappingStartToken)) {
            end_mark = this.peek_token().end_mark;
            event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
            this.state = 'parse_flow_mapping_first_key';
          } else if (block && this.check_token(tokens.BlockSequenceStartToken)) {
            end_mark = this.peek_token().end_mark;
            event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
            this.state = 'parse_block_sequence_first_entry';
          } else if (block && this.check_token(tokens.BlockMappingStartToken)) {
            end_mark = this.peek_token().end_mark;
            event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
            this.state = 'parse_block_mapping_first_key';
          } else if (anchor !== null || tag !== null) {
            event = new events.ScalarEvent(anchor, tag, [implicit, false], '', start_mark, end_mark);
            this.state = this.states.pop();
          } else {
            if (block) {
              node = 'block';
            } else {
              node = 'flow';
            }
            token = this.peek_token();
            throw new exports.ParserError("while parsing a " + node + " node", start_mark, "expected the node content, but found " + token.id, token.start_mark);
          }
        }
      }
      return event;
    };

    Parser.prototype.parse_block_sequence_first_entry = function() {
      var token;
      token = this.get_token();
      this.marks.push(token.start_mark);
      return this.parse_block_sequence_entry();
    };

    Parser.prototype.parse_block_sequence_entry = function() {
      var event, token;
      if (this.check_token(tokens.BlockEntryToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.BlockEntryToken, tokens.BlockEndToken)) {
          this.states.push('parse_block_sequence_entry');
          return this.parse_block_node();
        } else {
          this.state = 'parse_block_sequence_entry';
          return this.process_empty_scalar(token.end_mark);
        }
      }
      if (!this.check_token(tokens.BlockEndToken)) {
        token = this.peek_token();
        throw new exports.ParserError('while parsing a block collection', this.marks.slice(-1)[0], "expected <block end>, but found " + token.id, token.start_mark);
      }
      token = this.get_token();
      event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
      this.state = this.states.pop();
      this.marks.pop();
      return event;
    };

    Parser.prototype.parse_indentless_sequence_entry = function() {
      var event, token;
      if (this.check_token(tokens.BlockEntryToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.BlockEntryToken, tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
          this.states.push('parse_indentless_sequence_entry');
          return this.parse_block_node();
        } else {
          this.state = 'parse_indentless_sequence_entry';
          return this.process_empty_scalar(token.end_mark);
        }
      }
      token = this.peek_token();
      event = new events.SequenceEndEvent(token.start_mark, token.start_mark);
      this.state = this.states.pop();
      return event;
    };

    Parser.prototype.parse_block_mapping_first_key = function() {
      var token;
      token = this.get_token();
      this.marks.push(token.start_mark);
      return this.parse_block_mapping_key();
    };

    Parser.prototype.parse_block_mapping_key = function() {
      var event, token;
      if (this.check_token(tokens.KeyToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
          this.states.push('parse_block_mapping_value');
          return this.parse_block_node_or_indentless_sequence();
        } else {
          this.state = 'parse_block_mapping_value';
          return this.process_empty_scalar(token.end_mark);
        }
      }
      if (!this.check_token(tokens.BlockEndToken)) {
        token = this.peek_token();
        throw new exports.ParserError('while parsing a block mapping', this.marks.slice(-1)[0], "expected <block end>, but found " + token.id, token.start_mark);
      }
      token = this.get_token();
      event = new events.MappingEndEvent(token.start_mark, token.end_mark);
      this.state = this.states.pop();
      this.marks.pop();
      return event;
    };

    Parser.prototype.parse_block_mapping_value = function() {
      var token;
      if (this.check_token(tokens.ValueToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
          this.states.push('parse_block_mapping_key');
          return this.parse_block_node_or_indentless_sequence();
        } else {
          this.state = 'parse_block_mapping_key';
          return this.process_empty_scalar(token.end_mark);
        }
      } else {
        this.state = 'parse_block_mapping_key';
        token = this.peek_token();
        return this.process_empty_scalar(token.start_mark);
      }
    };

    Parser.prototype.parse_flow_sequence_first_entry = function() {
      var token;
      token = this.get_token();
      this.marks.push(token.start_mark);
      return this.parse_flow_sequence_entry(true);
    };

    Parser.prototype.parse_flow_sequence_entry = function(first) {
      var event, token;
      if (first == null) {
        first = false;
      }
      if (!this.check_token(tokens.FlowSequenceEndToken)) {
        if (!first) {
          if (this.check_token(tokens.FlowEntryToken)) {
            this.get_token();
          } else {
            token = this.peek_token();
            throw new exports.ParserError('while parsing a flow sequence', this.marks.slice(-1)[0], "expected ',' or ']', but got " + token.id, token.start_mark);
          }
        }
        if (this.check_token(tokens.KeyToken)) {
          token = this.peek_token();
          event = new events.MappingStartEvent(null, null, true, token.start_mark, token.end_mark, true);
          this.state = 'parse_flow_sequence_entry_mapping_key';
          return event;
        } else if (!this.check_token(tokens.FlowSequenceEndToken)) {
          this.states.push('parse_flow_sequence_entry');
          return this.parse_flow_node();
        }
      }
      token = this.get_token();
      event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
      this.state = this.states.pop();
      this.marks.pop();
      return event;
    };

    Parser.prototype.parse_flow_sequence_entry_mapping_key = function() {
      var token;
      token = this.get_token();
      if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
        this.states.push('parse_flow_sequence_entry_mapping_value');
        return this.parse_flow_node();
      } else {
        this.state = 'parse_flow_sequence_entry_mapping_value';
        return this.process_empty_scalar(token.end_mark);
      }
    };

    Parser.prototype.parse_flow_sequence_entry_mapping_value = function() {
      var token;
      if (this.check_token(tokens.ValueToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
          this.states.push('parse_flow_sequence_entry_mapping_end');
          return this.parse_flow_node();
        } else {
          this.state = 'parse_flow_sequence_entry_mapping_end';
          return this.process_empty_scalar(token.end_mark);
        }
      } else {
        this.state = 'parse_flow_sequence_entry_mapping_end';
        token = this.peek_token();
        return this.process_empty_scalar(token.start_mark);
      }
    };

    Parser.prototype.parse_flow_sequence_entry_mapping_end = function() {
      var token;
      this.state = 'parse_flow_sequence_entry';
      token = this.peek_token();
      return new events.MappingEndEvent(token.start_mark, token.start_mark);
    };

    Parser.prototype.parse_flow_mapping_first_key = function() {
      var token;
      token = this.get_token();
      this.marks.push(token.start_mark);
      return this.parse_flow_mapping_key(true);
    };

    Parser.prototype.parse_flow_mapping_key = function(first) {
      var event, token;
      if (first == null) {
        first = false;
      }
      if (!this.check_token(tokens.FlowMappingEndToken)) {
        if (!first) {
          if (this.check_token(tokens.FlowEntryToken)) {
            this.get_token();
          } else {
            token = this.peek_token();
            throw new exports.ParserError('while parsing a flow mapping', this.marks.slice(-1)[0], "expected ',' or '}', but got " + token.id, token.start_mark);
          }
        }
        if (this.check_token(tokens.KeyToken)) {
          token = this.get_token();
          if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
            this.states.push('parse_flow_mapping_value');
            return this.parse_flow_node();
          } else {
            this.state = 'parse_flow_mapping_value';
            return this.process_empty_scalar(token.end_mark);
          }
        } else if (!this.check_token(tokens.FlowMappingEndToken)) {
          this.states.push('parse_flow_mapping_empty_value');
          return this.parse_flow_node();
        }
      }
      token = this.get_token();
      event = new events.MappingEndEvent(token.start_mark, token.end_mark);
      this.state = this.states.pop();
      this.marks.pop();
      return event;
    };

    Parser.prototype.parse_flow_mapping_value = function() {
      var token;
      if (this.check_token(tokens.ValueToken)) {
        token = this.get_token();
        if (!this.check_token(tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
          this.states.push('parse_flow_mapping_key');
          return this.parse_flow_node();
        } else {
          this.state = 'parse_flow_mapping_key';
          return this.process_empty_scalar(token.end_mark);
        }
      } else {
        this.state = 'parse_flow_mapping_key';
        token = this.peek_token();
        return this.process_empty_scalar(token.start_mark);
      }
    };

    Parser.prototype.parse_flow_mapping_empty_value = function() {
      this.state = 'parse_flow_mapping_key';
      return this.process_empty_scalar(this.peek_token().start_mark);
    };

    Parser.prototype.process_empty_scalar = function(mark) {
      return new events.ScalarEvent(null, null, [true, false], '', mark, mark);
    };

    return Parser;

  })();

}).call(this);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const path = __importStar(__webpack_require__(8));
class Package {
    constructor(solidityDirectory) {
        this.build_dir = 'bin';
        this.sol_sources = solidityDirectory;
        this.name = '';
        this.version = '';
        this.absoluletPath = '';
    }
    getSolSourcesAbsolutePath() {
        if (this.sol_sources !== undefined || this.sol_sources === '') {
            return path.join(this.absoluletPath, this.sol_sources);
        }
        return this.absoluletPath;
    }
    isImportForThis(contractDependencyImport) {
        const splitDirectories = contractDependencyImport.split('/');
        if (splitDirectories.length === 1) {
            return false;
        }
        return splitDirectories[0] === this.name;
    }
    resolveImport(contractDependencyImport) {
        if (this.isImportForThis(contractDependencyImport)) {
            return path.join(this.getSolSourcesAbsolutePath(), contractDependencyImport.substring(this.name.length));
        }
        return null;
    }
}
exports.Package = Package;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(projectPackage, dependencies, packagesDir) {
        this.projectPackage = projectPackage;
        this.dependencies = dependencies;
        this.packagesDir = packagesDir;
    }
    // This will need to add the current package as a parameter to resolve version dependencies
    findPackage(contractDependencyImport) {
        return this.dependencies.find((depPack) => depPack.isImportForThis(contractDependencyImport));
    }
}
exports.Project = Project;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(30);
const fs_1 = tslib_1.__importDefault(__webpack_require__(7));
const log4js_1 = tslib_1.__importDefault(__webpack_require__(31));
const path_1 = tslib_1.__importDefault(__webpack_require__(8));
const os_1 = tslib_1.__importDefault(__webpack_require__(39));
function getLogFile() {
    let file = process.env.NVIM_COC_LOG_FILE;
    if (file)
        return file;
    let dir = process.env.XDG_RUNTIME_DIR;
    if (dir)
        return path_1.default.join(dir, `coc-nvim-${process.pid}.log`);
    dir = path_1.default.join(os_1.default.tmpdir(), `coc.nvim-${process.pid}`);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir);
    return path_1.default.join(dir, `coc-nvim.log`);
}
const MAX_LOG_SIZE = 1024 * 1024;
const MAX_LOG_BACKUPS = 10;
let logfile = getLogFile();
const level = process.env.NVIM_COC_LOG_LEVEL || 'info';
if (fs_1.default.existsSync(logfile)) {
    // cleanup if exists
    try {
        fs_1.default.writeFileSync(logfile, '', { encoding: 'utf8', mode: 0o666 });
    }
    catch (e) {
        // noop
    }
}
log4js_1.default.configure({
    disableClustering: true,
    appenders: {
        out: {
            type: 'file',
            mode: 0o666,
            filename: logfile,
            maxLogSize: MAX_LOG_SIZE,
            backups: MAX_LOG_BACKUPS,
            layout: {
                type: 'pattern',
                // Format log in following pattern:
                // yyyy-MM-dd HH:mm:ss.mil $Level (pid:$pid) $categroy - $message.
                pattern: `%d{ISO8601} %p (pid:${process.pid}) [%c] - %m`,
            },
        }
    },
    categories: {
        default: { appenders: ['out'], level }
    }
});
module.exports = (name = 'coc-nvim') => {
    let logger = log4js_1.default.getLogger(name);
    logger.getLogFile = () => {
        return logfile;
    };
    return logger;
};
//# sourceMappingURL=logger.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview log4js is a library to log in JavaScript in similar manner
 * than in log4j for Java (but not really).
 *
 * <h3>Example:</h3>
 * <pre>
 *  const logging = require('log4js');
 *  const log = logging.getLogger('some-category');
 *
 *  //call the log
 *  log.trace('trace me' );
 * </pre>
 *
 * NOTE: the authors below are the original browser-based log4js authors
 * don't try to contact them about bugs in this version :)
 * @author Stephan Strittmatter - http://jroller.com/page/stritti
 * @author Seth Chisamore - http://www.chisamore.com
 * @since 2005-05-20
 * Website: http://log4js.berlios.de
 */
const debug = __webpack_require__(32)("log4js:main");
const fs = __webpack_require__(7);
const deepClone = __webpack_require__(41)({ proto: true });
const configuration = __webpack_require__(42);
const layouts = __webpack_require__(43);
const levels = __webpack_require__(45);
const appenders = __webpack_require__(46);
const categories = __webpack_require__(116);
const Logger = __webpack_require__(117);
const clustering = __webpack_require__(47);
const connectLogger = __webpack_require__(118);

let enabled = false;

function sendLogEventToAppender(logEvent) {
  if (!enabled) return;
  debug("Received log event ", logEvent);
  const categoryAppenders = categories.appendersForCategory(
    logEvent.categoryName
  );
  categoryAppenders.forEach(appender => {
    appender(logEvent);
  });
}

function loadConfigurationFile(filename) {
  debug(`Loading configuration from ${filename}`);
  try {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  } catch (e) {
    throw new Error(
      `Problem reading config from file "${filename}". Error was ${e.message}`,
      e
    );
  }
}

function configure(configurationFileOrObject) {
  let configObject = configurationFileOrObject;

  if (typeof configObject === "string") {
    configObject = loadConfigurationFile(configurationFileOrObject);
  }
  debug(`Configuration is ${configObject}`);

  configuration.configure(deepClone(configObject));

  clustering.onMessage(sendLogEventToAppender);

  enabled = true;

  // eslint-disable-next-line no-use-before-define
  return log4js;
}

/**
 * Shutdown all log appenders. This will first disable all writing to appenders
 * and then call the shutdown function each appender.
 *
 * @params {Function} cb - The callback to be invoked once all appenders have
 *  shutdown. If an error occurs, the callback will be given the error object
 *  as the first argument.
 */
function shutdown(cb) {
  debug("Shutdown called. Disabling all log writing.");
  // First, disable all writing to appenders. This prevents appenders from
  // not being able to be drained because of run-away log writes.
  enabled = false;

  // Call each of the shutdown functions in parallel
  const appendersToCheck = Array.from(appenders.values());
  const shutdownFunctions = appendersToCheck.reduceRight(
    (accum, next) => (next.shutdown ? accum + 1 : accum),
    0
  );
  let completed = 0;
  let error;

  debug(`Found ${shutdownFunctions} appenders with shutdown functions.`);
  function complete(err) {
    error = error || err;
    completed += 1;
    debug(`Appender shutdowns complete: ${completed} / ${shutdownFunctions}`);
    if (completed >= shutdownFunctions) {
      debug("All shutdown functions completed.");
      cb(error);
    }
  }

  if (shutdownFunctions === 0) {
    debug("No appenders with shutdown functions found.");
    return cb();
  }

  appendersToCheck.filter(a => a.shutdown).forEach(a => a.shutdown(complete));

  return null;
}

/**
 * Get a logger instance.
 * @static
 * @param loggerCategoryName
 * @return {Logger} instance of logger for the category
 */
function getLogger(category) {
  if (!enabled) {
    configure(
      process.env.LOG4JS_CONFIG || {
        appenders: { out: { type: "stdout" } },
        categories: { default: { appenders: ["out"], level: "OFF" } }
      }
    );
  }
  return new Logger(category || "default");
}

/**
 * @name log4js
 * @namespace Log4js
 * @property getLogger
 * @property configure
 * @property shutdown
 */
const log4js = {
  getLogger,
  configure,
  shutdown,
  connectLogger,
  levels,
  addLayout: layouts.addLayout
};

module.exports = log4js;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(33);
} else {
	module.exports = __webpack_require__(36);
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(34)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(35);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(37);
const util = __webpack_require__(16);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(38);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(34)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(39);
const hasFlag = __webpack_require__(40);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = rfdc

function rfdc (opts) {
  opts = opts || {}

  if (opts.circles) return rfdcCircles(opts)
  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a)
    var a2 = new Array(keys.length)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]
      var cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur)
      } else {
        a2[k] = fn(cur)
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    var o2 = {}
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else {
        o2[k] = clone(cur)
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    var o2 = {}
    for (var k in o) {
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else {
        o2[k] = cloneProto(cur)
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  var refs = []
  var refsNew = []

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a)
    var a2 = new Array(keys.length)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]
      var cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur)
      } else {
        var index = refs.indexOf(cur)
        if (index !== -1) {
          a2[k] = refsNew[index]
        } else {
          a2[k] = fn(cur)
        }
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    var o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else {
        var i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = clone(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    var o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (var k in o) {
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else {
        var i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = cloneProto(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {



const util = __webpack_require__(16);
const debug = __webpack_require__(32)('log4js:configuration');

const preProcessingListeners = [];
const listeners = [];

const not = thing => !thing;

const anObject = thing => thing && typeof thing === 'object' && !Array.isArray(thing);

const validIdentifier = thing => /^[A-Za-z][A-Za-z0-9_]*$/g.test(thing);

const anInteger = thing => thing && typeof thing === 'number' && Number.isInteger(thing);

const addListener = (fn) => {
  listeners.push(fn);
  debug(`Added listener, now ${listeners.length} listeners`);
};

const addPreProcessingListener = (fn) => {
  preProcessingListeners.push(fn);
  debug(`Added pre-processing listener, now ${preProcessingListeners.length} listeners`);
};

const throwExceptionIf = (config, checks, message) => {
  const tests = Array.isArray(checks) ? checks : [checks];
  tests.forEach((test) => {
    if (test) {
      throw new Error(`Problem with log4js configuration: (${util.inspect(config, { depth: 5 })})`
        + ` - ${message}`);
    }
  });
};

const configure = (candidate) => {
  debug('New configuration to be validated: ', candidate);
  throwExceptionIf(candidate, not(anObject(candidate)), 'must be an object.');

  debug(`Calling pre-processing listeners (${preProcessingListeners.length})`);
  preProcessingListeners.forEach(listener => listener(candidate));
  debug('Configuration pre-processing finished.');

  debug(`Calling configuration listeners (${listeners.length})`);
  listeners.forEach(listener => listener(candidate));
  debug('Configuration finished.');
};

module.exports = {
  configure,
  addListener,
  addPreProcessingListener,
  throwExceptionIf,
  anObject,
  anInteger,
  validIdentifier,
  not
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

const dateFormat = __webpack_require__(44);
const os = __webpack_require__(39);
const util = __webpack_require__(16);
const path = __webpack_require__(8);

const styles = {
  // styles
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [91, 39],
  yellow: [33, 39]
};

function colorizeStart(style) {
  return style ? `\x1B[${styles[style][0]}m` : '';
}

function colorizeEnd(style) {
  return style ? `\x1B[${styles[style][1]}m` : '';
}

/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, style) {
  return colorizeStart(style) + str + colorizeEnd(style);
}

function timestampLevelAndCategory(loggingEvent, colour) {
  return colorize(
    util.format(
      '[%s] [%s] %s - ',
      dateFormat.asString(loggingEvent.startTime),
      loggingEvent.level.toString(),
      loggingEvent.categoryName
    ),
    colour
  );
}

/**
 * BasicLayout is a simple layout for storing the logs. The logs are stored
 * in following format:
 * <pre>
 * [startTime] [logLevel] categoryName - message\n
 * </pre>
 *
 * @author Stephan Strittmatter
 */
function basicLayout(loggingEvent) {
  return timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data);
}

/**
 * colouredLayout - taken from masylum's fork.
 * same as basicLayout, but with colours.
 */
function colouredLayout(loggingEvent) {
  return timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util.format(...loggingEvent.data);
}

function messagePassThroughLayout(loggingEvent) {
  return util.format(...loggingEvent.data);
}

function dummyLayout(loggingEvent) {
  return loggingEvent.data[0];
}

/**
 * PatternLayout
 * Format for specifiers is %[padding].[truncation][field]{[format]}
 * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
 * both padding and truncation can be negative.
 * Negative truncation = trunc from end of string
 * Positive truncation = trunc from start of string
 * Negative padding = pad right
 * Positive padding = pad left
 *
 * Fields can be any of:
 *  - %r time in toLocaleTimeString format
 *  - %p log level
 *  - %c log category
 *  - %h hostname
 *  - %m log data
 *  - %d date in constious formats
 *  - %% %
 *  - %n newline
 *  - %z pid
 *  - %f filename
 *  - %l line number
 *  - %o column postion
 *  - %s call stack
 *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
 *  - %X{<tokenname>} add dynamic tokens to your log. Tokens are specified in logger context
 * You can use %[ and %] to define a colored block.
 *
 * Tokens are specified as simple key:value objects.
 * The key represents the token name whereas the value can be a string or function
 * which is called to extract the value to put in the log message. If token is not
 * found, it doesn't replace the field.
 *
 * A sample token would be: { 'pid' : function() { return process.pid; } }
 *
 * Takes a pattern string, array of tokens and returns a layout function.
 * @return {Function}
 * @param pattern
 * @param tokens
 * @param timezoneOffset
 *
 * @authors ['Stephan Strittmatter', 'Jan Schmidle']
 */
function patternLayout(pattern, tokens) {
  const TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n';
  const regex = /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflos%])(\{([^}]+)\})?|([^%]+)/;

  pattern = pattern || TTCC_CONVERSION_PATTERN;

  function categoryName(loggingEvent, specifier) {
    let loggerName = loggingEvent.categoryName;
    if (specifier) {
      const precision = parseInt(specifier, 10);
      const loggerNameBits = loggerName.split('.');
      if (precision < loggerNameBits.length) {
        loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join('.');
      }
    }
    return loggerName;
  }

  function formatAsDate(loggingEvent, specifier) {
    let format = dateFormat.ISO8601_FORMAT;
    if (specifier) {
      format = specifier;
      // Pick up special cases
      if (format === 'ISO8601') {
        format = dateFormat.ISO8601_FORMAT;
      } else if (format === 'ISO8601_WITH_TZ_OFFSET') {
        format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
      } else if (format === 'ABSOLUTE') {
        format = dateFormat.ABSOLUTETIME_FORMAT;
      } else if (format === 'DATE') {
        format = dateFormat.DATETIME_FORMAT;
      }
    }
    // Format the date
    return dateFormat.asString(format, loggingEvent.startTime);
  }

  function hostname() {
    return os.hostname().toString();
  }

  function formatMessage(loggingEvent) {
    return util.format(...loggingEvent.data);
  }

  function endOfLine() {
    return os.EOL;
  }

  function logLevel(loggingEvent) {
    return loggingEvent.level.toString();
  }

  function startTime(loggingEvent) {
    return dateFormat.asString('hh:mm:ss', loggingEvent.startTime);
  }

  function startColour(loggingEvent) {
    return colorizeStart(loggingEvent.level.colour);
  }

  function endColour(loggingEvent) {
    return colorizeEnd(loggingEvent.level.colour);
  }

  function percent() {
    return '%';
  }

  function pid(loggingEvent) {
    return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
  }

  function clusterInfo() {
    // this used to try to return the master and worker pids,
    // but it would never have worked because master pid is not available to workers
    // leaving this here to maintain compatibility for patterns
    return pid();
  }

  function userDefined(loggingEvent, specifier) {
    if (typeof tokens[specifier] !== 'undefined') {
      return typeof tokens[specifier] === 'function' ? tokens[specifier](loggingEvent) : tokens[specifier];
    }

    return null;
  }

  function contextDefined(loggingEvent, specifier) {
    const resolver = loggingEvent.context[specifier];

    if (typeof resolver !== 'undefined') {
      return typeof resolver === 'function' ? resolver(loggingEvent) : resolver;
    }

    return null;
  }

  function fileName(loggingEvent, specifier) {
    let filename = loggingEvent.fileName || '';
    if (specifier) {
      const fileDepth = parseInt(specifier, 10);
      const fileList = filename.split(path.sep);
      if (fileList.length > fileDepth) {
        filename = fileList.slice(-fileDepth).join(path.sep);
      }
    }

    return filename;
  }

  function lineNumber(loggingEvent) {
    return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : '';
  }

  function columnNumber(loggingEvent) {
    return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : '';
  }

  function callStack(loggingEvent) {
    return loggingEvent.callStack || '';
  }

  /* eslint quote-props:0 */
  const replacers = {
    c: categoryName,
    d: formatAsDate,
    h: hostname,
    m: formatMessage,
    n: endOfLine,
    p: logLevel,
    r: startTime,
    '[': startColour,
    ']': endColour,
    y: clusterInfo,
    z: pid,
    '%': percent,
    x: userDefined,
    X: contextDefined,
    f: fileName,
    l: lineNumber,
    o: columnNumber,
    s: callStack
  };

  function replaceToken(conversionCharacter, loggingEvent, specifier) {
    return replacers[conversionCharacter](loggingEvent, specifier);
  }

  function truncate(truncation, toTruncate) {
    let len;
    if (truncation) {
      len = parseInt(truncation.substr(1), 10);
      // negative truncate length means truncate from end of string
      return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
    }

    return toTruncate;
  }

  function pad(padding, toPad) {
    let len;
    if (padding) {
      if (padding.charAt(0) === '-') {
        len = parseInt(padding.substr(1), 10);
        // Right pad with spaces
        while (toPad.length < len) {
          toPad += ' ';
        }
      } else {
        len = parseInt(padding, 10);
        // Left pad with spaces
        while (toPad.length < len) {
          toPad = ` ${toPad}`;
        }
      }
    }
    return toPad;
  }

  function truncateAndPad(toTruncAndPad, truncation, padding) {
    let replacement = toTruncAndPad;
    replacement = truncate(truncation, replacement);
    replacement = pad(padding, replacement);
    return replacement;
  }

  return function (loggingEvent) {
    let formattedString = '';
    let result;
    let searchString = pattern;

    /* eslint no-cond-assign:0 */
    while ((result = regex.exec(searchString)) !== null) {
      // const matchedString = result[0];
      const padding = result[1];
      const truncation = result[2];
      const conversionCharacter = result[3];
      const specifier = result[5];
      const text = result[6];

      // Check if the pattern matched was just normal text
      if (text) {
        formattedString += text.toString();
      } else {
        // Create a raw replacement string based on the conversion
        // character and specifier
        const replacement = replaceToken(conversionCharacter, loggingEvent, specifier);
        formattedString += truncateAndPad(replacement, truncation, padding);
      }
      searchString = searchString.substr(result.index + result[0].length);
    }
    return formattedString;
  };
}

const layoutMakers = {
  messagePassThrough () {
    return messagePassThroughLayout;
  },
  basic () {
    return basicLayout;
  },
  colored () {
    return colouredLayout;
  },
  coloured () {
    return colouredLayout;
  },
  pattern (config) {
    return patternLayout(config && config.pattern, config && config.tokens);
  },
  dummy () {
    return dummyLayout;
  }
};

module.exports = {
  basicLayout,
  messagePassThroughLayout,
  patternLayout,
  colouredLayout,
  coloredLayout: colouredLayout,
  dummyLayout,
  addLayout (name, serializerGenerator) {
    layoutMakers[name] = serializerGenerator;
  },
  layout (name, config) {
    return layoutMakers[name] && layoutMakers[name](config);
  }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function padWithZeros(vNumber, width) {
  var numAsString = vNumber.toString();
  while (numAsString.length < width) {
    numAsString = "0" + numAsString;
  }
  return numAsString;
}

function addZero(vNumber) {
  return padWithZeros(vNumber, 2);
}

/**
 * Formats the TimeOffset
 * Thanks to http://www.svendtofte.com/code/date_format/
 * @private
 */
function offset(timezoneOffset) {
  var os = Math.abs(timezoneOffset);
  var h = String(Math.floor(os / 60));
  var m = String(os % 60);
  if (h.length === 1) {
    h = "0" + h;
  }
  if (m.length === 1) {
    m = "0" + m;
  }
  return timezoneOffset < 0 ? "+" + h + m : "-" + h + m;
}

function datePart(date, displayUTC, part) {
  return displayUTC ? date["getUTC" + part]() : date["get" + part]();
}

function asString(format, date) {
  if (typeof format !== "string") {
    date = format;
    format = module.exports.ISO8601_FORMAT;
  }
  if (!date) {
    date = module.exports.now();
  }

  var displayUTC = format.indexOf("O") > -1;

  var vDay = addZero(datePart(date, displayUTC, "Date"));
  var vMonth = addZero(datePart(date, displayUTC, "Month") + 1);
  var vYearLong = addZero(datePart(date, displayUTC, "FullYear"));
  var vYearShort = addZero(vYearLong.substring(2, 4));
  var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
  var vHour = addZero(datePart(date, displayUTC, "Hours"));
  var vMinute = addZero(datePart(date, displayUTC, "Minutes"));
  var vSecond = addZero(datePart(date, displayUTC, "Seconds"));
  var vMillisecond = padWithZeros(
    datePart(date, displayUTC, "Milliseconds"),
    3
  );
  var vTimeZone = offset(date.getTimezoneOffset());
  var formatted = format
    .replace(/dd/g, vDay)
    .replace(/MM/g, vMonth)
    .replace(/y{1,4}/g, vYear)
    .replace(/hh/g, vHour)
    .replace(/mm/g, vMinute)
    .replace(/ss/g, vSecond)
    .replace(/SSS/g, vMillisecond)
    .replace(/O/g, vTimeZone);
  return formatted;
}

function extractDateParts(pattern, str, missingValuesDate) {
  var matchers = [
    {
      pattern: /y{1,4}/,
      regexp: "\\d{1,4}",
      fn: function(date, value) {
        date.setFullYear(value);
      }
    },
    {
      pattern: /MM/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        date.setMonth(value - 1);
      }
    },
    {
      pattern: /dd/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        date.setDate(value);
      }
    },
    {
      pattern: /hh/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        date.setHours(value);
      }
    },
    {
      pattern: /mm/,
      regexp: "\\d\\d",
      fn: function(date, value) {
        date.setMinutes(value);
      }
    },
    {
      pattern: /ss/,
      regexp: "\\d\\d",
      fn: function(date, value) {
        date.setSeconds(value);
      }
    },
    {
      pattern: /SSS/,
      regexp: "\\d\\d\\d",
      fn: function(date, value) {
        date.setMilliseconds(value);
      }
    },
    {
      pattern: /O/,
      regexp: "[+-]\\d{3,4}|Z",
      fn: function(date, value) {
        if (value === "Z") {
          value = 0;
        }
        var offset = Math.abs(value);
        var minutes = (offset % 100) + Math.floor(offset / 100) * 60;
        date.setMinutes(date.getMinutes() + (value > 0 ? minutes : -minutes));
      }
    }
  ];

  var parsedPattern = matchers.reduce(
    function(p, m) {
      if (m.pattern.test(p.regexp)) {
        m.index = p.regexp.match(m.pattern).index;
        p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
      } else {
        m.index = -1;
      }
      return p;
    },
    { regexp: pattern, index: [] }
  );

  var dateFns = matchers.filter(function(m) {
    return m.index > -1;
  });
  dateFns.sort(function(a, b) {
    return a.index - b.index;
  });

  var matcher = new RegExp(parsedPattern.regexp);
  var matches = matcher.exec(str);
  if (matches) {
    var date = missingValuesDate || module.exports.now();
    dateFns.forEach(function(f, i) {
      f.fn(date, matches[i + 1]);
    });
    return date;
  }

  throw new Error(
    "String '" + str + "' could not be parsed as '" + pattern + "'"
  );
}

function parse(pattern, str, missingValuesDate) {
  if (!pattern) {
    throw new Error("pattern must be supplied");
  }

  return extractDateParts(pattern, str, missingValuesDate);
}

/**
 * Used for testing - replace this function with a fixed date.
 */
function now() {
  return new Date();
}

module.exports = asString;
module.exports.asString = asString;
module.exports.parse = parse;
module.exports.now = now;
module.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
module.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
module.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {



const configuration = __webpack_require__(42);

const validColours = [
  'white', 'grey', 'black',
  'blue', 'cyan', 'green',
  'magenta', 'red', 'yellow'
];

class Level {
  constructor(level, levelStr, colour) {
    this.level = level;
    this.levelStr = levelStr;
    this.colour = colour;
  }

  toString() {
    return this.levelStr;
  }

  /**
   * converts given String to corresponding Level
   * @param {Level|String} sArg -- String value of Level OR Log4js.Level
   * @param {Level} [defaultLevel] -- default Level, if no String representation
   * @return {Level}
   */
  static getLevel(sArg, defaultLevel) {
    if (!sArg) {
      return defaultLevel;
    }

    if (sArg instanceof Level) {
      return sArg;
    }

    // a json-serialised level won't be an instance of Level (see issue #768)
    if (sArg instanceof Object && sArg.levelStr) {
      sArg = sArg.levelStr;
    }

    return Level[sArg.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels) {
    if (customLevels) {
      const levels = Object.keys(customLevels);
      levels.forEach((l) => {
        const levelStr = l.toUpperCase();
        Level[levelStr] = new Level(
          customLevels[l].value,
          levelStr,
          customLevels[l].colour
        );
        const existingLevelIndex = Level.levels.findIndex(lvl => lvl.levelStr === levelStr);
        if (existingLevelIndex > -1) {
          Level.levels[existingLevelIndex] = Level[levelStr];
        } else {
          Level.levels.push(Level[levelStr]);
        }
      });
      Level.levels.sort((a, b) => a.level - b.level);
    }
  }


  isLessThanOrEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level <= otherLevel.level;
  }

  isGreaterThanOrEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level >= otherLevel.level;
  }

  isEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level === otherLevel.level;
  }
}

Level.levels = [];
Level.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: 'grey' },
  TRACE: { value: 5000, colour: 'blue' },
  DEBUG: { value: 10000, colour: 'cyan' },
  INFO: { value: 20000, colour: 'green' },
  WARN: { value: 30000, colour: 'yellow' },
  ERROR: { value: 40000, colour: 'red' },
  FATAL: { value: 50000, colour: 'magenta' },
  MARK: { value: 9007199254740992, colour: 'grey' }, // 2^53
  OFF: { value: Number.MAX_VALUE, colour: 'grey' }
});

configuration.addListener((config) => {
  const levelConfig = config.levels;
  if (levelConfig) {
    configuration.throwExceptionIf(
      config,
      configuration.not(configuration.anObject(levelConfig)),
      'levels must be an object'
    );
    const newLevels = Object.keys(levelConfig);
    newLevels.forEach((l) => {
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.validIdentifier(l)),
        `level name "${l}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.anObject(levelConfig[l])),
        `level "${l}" must be an object`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(levelConfig[l].value),
        `level "${l}" must have a 'value' property`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.anInteger(levelConfig[l].value)),
        `level "${l}".value must have an integer value`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(levelConfig[l].colour),
        `level "${l}" must have a 'colour' property`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(validColours.indexOf(levelConfig[l].colour) > -1),
        `level "${l}".colour must be one of ${validColours.join(', ')}`
      );
    });
  }
});

configuration.addListener((config) => {
  Level.addLevels(config.levels);
});

module.exports = Level;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(8);
const debug = __webpack_require__(32)('log4js:appenders');
const configuration = __webpack_require__(42);
const clustering = __webpack_require__(47);
const levels = __webpack_require__(45);
const layouts = __webpack_require__(43);
const adapters = __webpack_require__(51);

// pre-load the core appenders so that webpack can find them
const coreAppenders = new Map();
coreAppenders.set('console', __webpack_require__(52));
coreAppenders.set('stdout', __webpack_require__(53));
coreAppenders.set('stderr', __webpack_require__(54));
coreAppenders.set('logLevelFilter', __webpack_require__(55));
coreAppenders.set('categoryFilter', __webpack_require__(56));
coreAppenders.set('noLogFilter', __webpack_require__(57));
coreAppenders.set('file', __webpack_require__(58));
coreAppenders.set('dateFile', __webpack_require__(114));

const appenders = new Map();

const tryLoading = (modulePath, config) => {
  debug('Loading module from ', modulePath);
  try {
    return __webpack_require__(115)(modulePath); //eslint-disable-line
  } catch (e) {
    // if the module was found, and we still got an error, then raise it
    configuration.throwExceptionIf(
      config,
      e.code !== 'MODULE_NOT_FOUND',
      `appender "${modulePath}" could not be loaded (error was: ${e})`
    );
    return undefined;
  }
};

const loadAppenderModule = (type, config) => coreAppenders.get(type)
  || tryLoading(`./${type}`, config)
  || tryLoading(type, config)
  || (__webpack_require__.c[__webpack_require__.s] && tryLoading(path.join(path.dirname(__webpack_require__.c[__webpack_require__.s].filename), type), config))
  || tryLoading(path.join(process.cwd(), type), config);

const createAppender = (name, config) => {
  const appenderConfig = config.appenders[name];
  const appenderModule = appenderConfig.type.configure
    ? appenderConfig.type : loadAppenderModule(appenderConfig.type, config);
  configuration.throwExceptionIf(
    config,
    configuration.not(appenderModule),
    `appender "${name}" is not valid (type "${appenderConfig.type}" could not be found)`
  );
  if (appenderModule.appender) {
    debug(`DEPRECATION: Appender ${appenderConfig.type} exports an appender function.`);
  }
  if (appenderModule.shutdown) {
    debug(`DEPRECATION: Appender ${appenderConfig.type} exports a shutdown function.`);
  }

  debug(`${name}: clustering.isMaster ? ${clustering.isMaster()}`);
  debug(`${name}: appenderModule is ${__webpack_require__(16).inspect(appenderModule)}`); // eslint-disable-line
  return clustering.onlyOnMaster(() => {
    debug(`calling appenderModule.configure for ${name} / ${appenderConfig.type}`);
    return appenderModule.configure(
      adapters.modifyConfig(appenderConfig),
      layouts,
      appender => appenders.get(appender),
      levels
    );
  }, () => {});
};

const setup = (config) => {
  appenders.clear();

  Object.keys(config.appenders).forEach((name) => {
    debug(`Creating appender ${name}`);
    appenders.set(name, createAppender(name, config));
  });
};

setup({ appenders: { out: { type: 'stdout' } } });

configuration.addListener((config) => {
  configuration.throwExceptionIf(
    config,
    configuration.not(configuration.anObject(config.appenders)),
    'must have a property "appenders" of type object.'
  );
  const appenderNames = Object.keys(config.appenders);
  configuration.throwExceptionIf(
    config,
    configuration.not(appenderNames.length),
    'must define at least one appender.'
  );

  appenderNames.forEach((name) => {
    configuration.throwExceptionIf(
      config,
      configuration.not(config.appenders[name].type),
      `appender "${name}" is not valid (must be an object with property "type")`
    );
  });
});

configuration.addListener(setup);

module.exports = appenders;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(32)("log4js:clustering");
const LoggingEvent = __webpack_require__(48);
const configuration = __webpack_require__(42);

let disabled = false;
let cluster = null;
try {
  cluster = __webpack_require__(50); //eslint-disable-line
} catch (e) {
  debug("cluster module not present");
  disabled = true;
}

const listeners = [];

let pm2 = false;
let pm2InstanceVar = "NODE_APP_INSTANCE";

const isPM2Master = () => pm2 && process.env[pm2InstanceVar] === "0";
const isMaster = () => disabled || cluster.isMaster || isPM2Master();

const sendToListeners = logEvent => {
  listeners.forEach(l => l(logEvent));
};

// in a multi-process node environment, worker loggers will use
// process.send
const receiver = (worker, message) => {
  // prior to node v6, the worker parameter was not passed (args were message, handle)
  debug("cluster message received from worker ", worker, ": ", message);
  if (worker.topic && worker.data) {
    message = worker;
    worker = undefined;
  }
  if (message && message.topic && message.topic === "log4js:message") {
    debug("received message: ", message.data);
    const logEvent = LoggingEvent.deserialise(message.data);
    sendToListeners(logEvent);
  }
};

if (!disabled) {
  configuration.addListener(config => {
    // clear out the listeners, because configure has been called.
    listeners.length = 0;

    ({
      pm2,
      disableClustering: disabled,
      pm2InstanceVar = "NODE_APP_INSTANCE"
    } = config);

    debug(`clustering disabled ? ${disabled}`);
    debug(`cluster.isMaster ? ${cluster && cluster.isMaster}`);
    debug(`pm2 enabled ? ${pm2}`);
    debug(`pm2InstanceVar = ${pm2InstanceVar}`);
    debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);

    // just in case configure is called after shutdown
    if (pm2) {
      process.removeListener("message", receiver);
    }
    if (cluster && cluster.removeListener) {
      cluster.removeListener("message", receiver);
    }

    if (disabled || config.disableClustering) {
      debug("Not listening for cluster messages, because clustering disabled.");
    } else if (isPM2Master()) {
      // PM2 cluster support
      // PM2 runs everything as workers - install pm2-intercom for this to work.
      // we only want one of the app instances to write logs
      debug("listening for PM2 broadcast messages");
      process.on("message", receiver);
    } else if (cluster.isMaster) {
      debug("listening for cluster messages");
      cluster.on("message", receiver);
    } else {
      debug("not listening for messages, because we are not a master process");
    }
  });
}

module.exports = {
  onlyOnMaster: (fn, notMaster) => (isMaster() ? fn() : notMaster),
  isMaster,
  send: msg => {
    if (isMaster()) {
      sendToListeners(msg);
    } else {
      if (!pm2) {
        msg.cluster = {
          workerId: cluster.worker.id,
          worker: process.pid
        };
      }
      process.send({ topic: "log4js:message", data: msg.serialise() });
    }
  },
  onMessage: listener => {
    listeners.push(listener);
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

const flatted = __webpack_require__(49);
const levels = __webpack_require__(45);

/**
 * @name LoggingEvent
 * @namespace Log4js
 */
class LoggingEvent {
  /**
   * Models a logging event.
   * @constructor
   * @param {String} categoryName name of category
   * @param {Log4js.Level} level level of message
   * @param {Array} data objects to log
   * @author Seth Chisamore
   */
  constructor(categoryName, level, data, context, location) {
    this.startTime = new Date();
    this.categoryName = categoryName;
    this.data = data;
    this.level = level;
    this.context = Object.assign({}, context);
    this.pid = process.pid;

    if (location) {
      this.functionName = location.functionName;
      this.fileName = location.fileName;
      this.lineNumber = location.lineNumber;
      this.columnNumber = location.columnNumber;
      this.callStack = location.callStack;
    }
  }

  serialise() {
    const logData = this.data.map((e) => {
      // JSON.stringify(new Error('test')) returns {}, which is not really useful for us.
      // The following allows us to serialize errors correctly.
      if (e && e.message && e.stack) {
        e = Object.assign({ message: e.message, stack: e.stack }, e);
      }
      return e;
    });
    this.data = logData;
    return flatted.stringify(this);
  }

  static deserialise(serialised) {
    let event;
    try {
      const rehydratedEvent = flatted.parse(serialised);
      rehydratedEvent.data = rehydratedEvent.data.map((e) => {
        if (e && e.message && e.stack) {
          const fakeError = new Error(e);
          Object.keys(e).forEach((key) => { fakeError[key] = e[key]; });
          e = fakeError;
        }
        return e;
      });
      event = new LoggingEvent(
        rehydratedEvent.categoryName,
        levels.getLevel(rehydratedEvent.level.levelStr),
        rehydratedEvent.data,
        rehydratedEvent.context
      );
      event.startTime = new Date(rehydratedEvent.startTime);
      event.pid = rehydratedEvent.pid;
      event.cluster = rehydratedEvent.cluster;
    } catch (e) {
      event = new LoggingEvent(
        'log4js',
        levels.ERROR,
        ['Unable to parse log:', serialised, 'because: ', e]
      );
    }

    return event;
  }
}

module.exports = LoggingEvent;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
var Flatted = (function (Primitive, primitive) {

  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  var Flatted = {

    parse: function parse(text, reviver) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      var $ = reviver || noop;
      var tmp = typeof value === 'object' && value ?
                  revive(input, new Set, value, $) :
                  value;
      return $.call({'': tmp}, '', tmp);
    },

    stringify: function stringify(value, replacer, space) {
      for (var
        firstRun,
        known = new Map,
        input = [],
        output = [],
        $ = replacer && typeof replacer === typeof input ?
              function (k, v) {
                if (k === '' || -1 < replacer.indexOf(k)) return v;
              } :
              (replacer || noop),
        i = +set(known, input, $.call({'': value}, '', value)),
        replace = function (key, value) {
          if (firstRun) {
            firstRun = !firstRun;
            return value;
          }
          var after = $.call(this, key, value);
          switch (typeof after) {
            case 'object':
              if (after === null) return after;
            case primitive:
              return known.get(after) || set(known, input, after);
          }
          return after;
        };
        i < input.length; i++
      ) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace, space);
      }
      return '[' + output.join(',') + ']';
    }

  };

  return Flatted;

  function noop(key, value) {
    return value;
  }

  function revive(input, parsed, output, $) {
    return Object.keys(output).reduce(
      function (output, key) {
        var value = output[key];
        if (value instanceof Primitive) {
          var tmp = input[value];
          if (typeof tmp === 'object' && !parsed.has(tmp)) {
            parsed.add(tmp);
            output[key] = $.call(output, key, revive(input, parsed, tmp, $));
          } else {
            output[key] = $.call(output, key, tmp);
          }
        } else
          output[key] = $.call(output, key, value);
        return output;
      },
      output
    );
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  }

  // the two kinds of primitives
  //  1. the real one
  //  2. the wrapped one

  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }

}(String, 'string'));
/* harmony default export */ __webpack_exports__["default"] = (Flatted);
var parse = Flatted.parse;
var stringify = Flatted.stringify;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

function maxFileSizeUnitTransform(maxLogSize) {
  if (typeof maxLogSize === 'number' && Number.isInteger(maxLogSize)) {
    return maxLogSize;
  }

  const units = {
    K: 1024,
    M: 1024 * 1024,
    G: 1024 * 1024 * 1024,
  };
  const validUnit = Object.keys(units);
  const unit = maxLogSize.substr(maxLogSize.length - 1).toLocaleUpperCase();
  const value = maxLogSize.substring(0, maxLogSize.length - 1).trim();

  if (validUnit.indexOf(unit) < 0 || !Number.isInteger(Number(value))) {
    throw Error(`maxLogSize: "${maxLogSize}" is invalid`);
  } else {
    return value * units[unit];
  }
}

function adapter(configAdapter, config) {
  const newConfig = Object.assign({}, config);
  Object.keys(configAdapter).forEach((key) => {
    if (newConfig[key]) {
      newConfig[key] = configAdapter[key](config[key]);
    }
  });
  return newConfig;
}

function fileAppenderAdapter(config) {
  const configAdapter = {
    maxLogSize: maxFileSizeUnitTransform
  };
  return adapter(configAdapter, config);
}

const adapters = {
  file: fileAppenderAdapter,
  fileSync: fileAppenderAdapter
};

module.exports.modifyConfig = config => (adapters[config.type] ? adapters[config.type](config) : config);


/***/ }),
/* 52 */
/***/ (function(module, exports) {

// eslint-disable-next-line no-console
const consoleLog = console.log.bind(console);

function consoleAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    consoleLog(layout(loggingEvent, timezoneOffset));
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return consoleAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;


/***/ }),
/* 53 */
/***/ (function(module, exports) {



function stdoutAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    process.stdout.write(`${layout(loggingEvent, timezoneOffset)}\n`);
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return stdoutAppender(layout, config.timezoneOffset);
}

exports.configure = configure;


/***/ }),
/* 54 */
/***/ (function(module, exports) {



function stderrAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    process.stderr.write(`${layout(loggingEvent, timezoneOffset)}\n`);
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return stderrAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

function logLevelFilter(minLevelString, maxLevelString, appender, levels) {
  const minLevel = levels.getLevel(minLevelString);
  const maxLevel = levels.getLevel(maxLevelString, levels.FATAL);
  return (logEvent) => {
    const eventLevel = logEvent.level;
    if (eventLevel.isGreaterThanOrEqualTo(minLevel) && eventLevel.isLessThanOrEqualTo(maxLevel)) {
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender, levels) {
  const appender = findAppender(config.appender);
  return logLevelFilter(config.level, config.maxLevel, appender, levels);
}

module.exports.configure = configure;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(32)('log4js:categoryFilter');

function categoryFilter(excludes, appender) {
  if (typeof excludes === 'string') excludes = [excludes];
  return (logEvent) => {
    debug(`Checking ${logEvent.categoryName} against ${excludes}`);
    if (excludes.indexOf(logEvent.categoryName) === -1) {
      debug('Not excluded, sending to appender');
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender) {
  const appender = findAppender(config.appender);
  return categoryFilter(config.exclude, appender);
}

module.exports.configure = configure;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {



const debug = __webpack_require__(32)('log4js:noLogFilter');

/**
 * The function removes empty or null regexp from the array
 * @param {Array<string>} regexp
 * @returns {Array<string>} a filtered string array with not empty or null regexp
 */
function removeNullOrEmptyRegexp(regexp) {
  const filtered = regexp.filter(el => ((el != null) && (el !== '')));
  return filtered;
}

/**
 * Returns a function that will exclude the events in case they match
 * with the regular expressions provided
 * @param {string | Array<string>} filters contains the regexp that will be used for the evaluation
 * @param {*} appender
 * @returns {function}
 */
function noLogFilter(filters, appender) {
  return (logEvent) => {
    debug(`Checking data: ${logEvent.data} against filters: ${filters}`);
    if (typeof filters === 'string') {
      filters = [filters];
    }
    filters = removeNullOrEmptyRegexp(filters);
    const regex = new RegExp(filters.join('|'), 'i');
    if (filters.length === 0
      || logEvent.data.findIndex(value => regex.test(value)) < 0) {
      debug('Not excluded, sending to appender');
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender) {
  const appender = findAppender(config.appender);
  return noLogFilter(config.exclude, appender);
}

module.exports.configure = configure;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(32)('log4js:file');
const path = __webpack_require__(8);
const streams = __webpack_require__(59);
const os = __webpack_require__(39);

const eol = os.EOL || '\n';

function openTheStream(file, fileSize, numFiles, options) {
  const stream = new streams.RollingFileStream(
    file,
    fileSize,
    numFiles,
    options
  );
  stream.on('error', (err) => {
    console.error('log4js.fileAppender - Writing to file %s, error happened ', file, err); //eslint-disable-line
  });
  return stream;
}


/**
 * File Appender writing the logs to a text file. Supports rolling of logs by size.
 *
 * @param file file log messages will be written to
 * @param layout a function that takes a logEvent and returns a string
 *   (defaults to basicLayout).
 * @param logSize - the maximum size (in bytes) for a log file,
 *   if not provided then logs won't be rotated.
 * @param numBackups - the number of log files to keep after logSize
 *   has been reached (default 5)
 * @param options - options to be passed to the underlying stream
 * @param timezoneOffset - optional timezone offset in minutes (default system local)
 */
function fileAppender(file, layout, logSize, numBackups, options, timezoneOffset) {
  file = path.normalize(file);
  numBackups = numBackups === undefined ? 5 : numBackups;
  // there has to be at least one backup if logSize has been specified
  numBackups = numBackups === 0 ? 1 : numBackups;

  debug(
    'Creating file appender (',
    file, ', ',
    logSize, ', ',
    numBackups, ', ',
    options, ', ',
    timezoneOffset, ')'
  );

  let writer = openTheStream(file, logSize, numBackups, options);

  const app = function (loggingEvent) {
    writer.write(layout(loggingEvent, timezoneOffset) + eol, 'utf8');
  };

  app.reopen = function () {
    writer.end(() => { writer = openTheStream(file, logSize, numBackups, options); });
  };

  app.sighupHandler = function () {
    debug('SIGHUP handler called.');
    app.reopen();
  };

  app.shutdown = function (complete) {
    process.removeListener('SIGHUP', app.sighupHandler);
    writer.end('', 'utf-8', complete);
  };

  // On SIGHUP, close and reopen all files. This allows this appender to work with
  // logrotate. Note that if you are using logrotate, you should not set
  // `logSize`.
  process.on('SIGHUP', app.sighupHandler);

  return app;
}

function configure(config, layouts) {
  let layout = layouts.basicLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  return fileAppender(
    config.filename,
    layout,
    config.maxLogSize,
    config.backups,
    config,
    config.timezoneOffset
  );
}

module.exports.configure = configure;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  RollingFileWriteStream: __webpack_require__(60),
  RollingFileStream: __webpack_require__(112),
  DateRollingFileStream: __webpack_require__(113)
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(61)("streamroller:RollingFileWriteStream");
const fs = __webpack_require__(66);
const path = __webpack_require__(8);
const newNow = __webpack_require__(107);
const format = __webpack_require__(44);
const { Writable } = __webpack_require__(73);
const fileNameFormatter = __webpack_require__(108);
const fileNameParser = __webpack_require__(109);
const moveAndMaybeCompressFile = __webpack_require__(110);

/**
 * RollingFileWriteStream is mainly used when writing to a file rolling by date or size.
 * RollingFileWriteStream inherits from stream.Writable
 */
class RollingFileWriteStream extends Writable {
  /**
   * Create a RollingFileWriteStream
   * @constructor
   * @param {string} filePath - The file path to write.
   * @param {object} options - The extra options
   * @param {number} options.numToKeep - The max numbers of files to keep.
   * @param {number} options.maxSize - The maxSize one file can reach. Unit is Byte.
   *                                   This should be more than 1024. The default is Number.MAX_SAFE_INTEGER.
   * @param {string} options.mode - The mode of the files. The default is '0644'. Refer to stream.writable for more.
   * @param {string} options.flags - The default is 'a'. Refer to stream.flags for more.
   * @param {boolean} options.compress - Whether to compress backup files.
   * @param {boolean} options.keepFileExt - Whether to keep the file extension.
   * @param {string} options.pattern - The date string pattern in the file name.
   * @param {boolean} options.alwaysIncludePattern - Whether to add date to the name of the first file.
   */
  constructor(filePath, options) {
    debug(`constructor: creating RollingFileWriteStream. path=${filePath}`);
    super(options);
    this.options = this._parseOption(options);
    this.fileObject = path.parse(filePath);
    if (this.fileObject.dir === "") {
      this.fileObject = path.parse(path.join(process.cwd(), filePath));
    }
    this.fileFormatter = fileNameFormatter({
      file: this.fileObject,
      alwaysIncludeDate: this.options.alwaysIncludePattern,
      needsIndex: this.options.maxSize < Number.MAX_SAFE_INTEGER,
      compress: this.options.compress,
      keepFileExt: this.options.keepFileExt
    });

    this.fileNameParser = fileNameParser({
      file: this.fileObject,
      keepFileExt: this.options.keepFileExt,
      pattern: this.options.pattern
    });

    this.state = {
      currentSize: 0
    };

    if (this.options.pattern) {
      this.state.currentDate = format(this.options.pattern, newNow());
    }

    this.filename = this.fileFormatter({
      index: 0,
      date: this.state.currentDate
    });
    if (["a", "a+", "as", "as+"].includes(this.options.flags)) {
      this._setExistingSizeAndDate();
    }

    debug(
      `constructor: create new file ${this.filename}, state=${JSON.stringify(
        this.state
      )}`
    );
    this._renewWriteStream();
  }

  _setExistingSizeAndDate() {
    try {
      const stats = fs.statSync(this.filename);
      this.state.currentSize = stats.size;
      if (this.options.pattern) {
        this.state.currentDate = format(this.options.pattern, stats.mtime);
      }
    } catch (e) {
      //file does not exist, that's fine - move along
      return;
    }
  }

  _parseOption(rawOptions) {
    const defaultOptions = {
      maxSize: Number.MAX_SAFE_INTEGER,
      numToKeep: Number.MAX_SAFE_INTEGER,
      encoding: "utf8",
      mode: parseInt("0644", 8),
      flags: "a",
      compress: false,
      keepFileExt: false,
      alwaysIncludePattern: false
    };
    const options = Object.assign({}, defaultOptions, rawOptions);
    if (options.maxSize <= 0) {
      throw new Error(`options.maxSize (${options.maxSize}) should be > 0`);
    }
    if (options.numToKeep <= 0) {
      throw new Error(`options.numToKeep (${options.numToKeep}) should be > 0`);
    }
    debug(
      `_parseOption: creating stream with option=${JSON.stringify(options)}`
    );
    return options;
  }

  _final(callback) {
    this.currentFileStream.end("", this.options.encoding, callback);
  }

  _write(chunk, encoding, callback) {
    this._shouldRoll().then(() => {
      debug(
        `_write: writing chunk. ` +
          `file=${this.currentFileStream.path} ` +
          `state=${JSON.stringify(this.state)} ` +
          `chunk=${chunk}`
      );
      this.currentFileStream.write(chunk, encoding, e => {
        this.state.currentSize += chunk.length;
        callback(e);
      });
    });
  }

  async _shouldRoll() {
    if (this._dateChanged() || this._tooBig()) {
      debug(
        `_shouldRoll: rolling because dateChanged? ${this._dateChanged()} or tooBig? ${this._tooBig()}`
      );
      await this._roll();
    }
  }

  _dateChanged() {
    return (
      this.state.currentDate &&
      this.state.currentDate !== format(this.options.pattern, newNow())
    );
  }

  _tooBig() {
    return this.state.currentSize >= this.options.maxSize;
  }

  _roll() {
    debug(`_roll: closing the current stream`);
    return new Promise((resolve, reject) => {
      this.currentFileStream.end("", this.options.encoding, () => {
        this._moveOldFiles()
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async _moveOldFiles() {
    const files = await this._getExistingFiles();
    const todaysFiles = this.state.currentDate
      ? files.filter(f => f.date === this.state.currentDate)
      : files;
    for (let i = todaysFiles.length; i >= 0; i--) {
      debug(`_moveOldFiles: i = ${i}`);
      const sourceFilePath = this.fileFormatter({
        date: this.state.currentDate,
        index: i
      });
      const targetFilePath = this.fileFormatter({
        date: this.state.currentDate,
        index: i + 1
      });

      await moveAndMaybeCompressFile(
        sourceFilePath,
        targetFilePath,
        this.options.compress && i === 0
      );
    }

    this.state.currentSize = 0;
    this.state.currentDate = this.state.currentDate
      ? format(this.options.pattern, newNow())
      : null;
    debug(
      `_moveOldFiles: finished rolling files. state=${JSON.stringify(
        this.state
      )}`
    );
    this._renewWriteStream();
    // wait for the file to be open before cleaning up old ones,
    // otherwise the daysToKeep calculations can be off
    await new Promise((resolve, reject) => {
      this.currentFileStream.write("", "utf8", () => {
        this._clean()
          .then(resolve)
          .catch(reject);
      });
    });
  }

  // Sorted from the oldest to the latest
  async _getExistingFiles() {
    const files = await fs.readdir(this.fileObject.dir).catch(() => []);

    debug(`_getExistingFiles: files=${files}`);
    const existingFileDetails = files
      .map(n => this.fileNameParser(n))
      .filter(n => n);

    const getKey = n =>
      (n.timestamp ? n.timestamp : newNow().getTime()) - n.index;
    existingFileDetails.sort((a, b) => getKey(a) - getKey(b));

    return existingFileDetails;
  }

  _renewWriteStream() {
    fs.ensureDirSync(this.fileObject.dir);
    const filePath = this.fileFormatter({
      date: this.state.currentDate,
      index: 0
    });
    const ops = {
      flags: this.options.flags,
      encoding: this.options.encoding,
      mode: this.options.mode
    };
    this.currentFileStream = fs.createWriteStream(filePath, ops);
    this.currentFileStream.on("error", e => {
      this.emit("error", e);
    });
  }

  async _clean() {
    const existingFileDetails = await this._getExistingFiles();
    debug(
      `_clean: numToKeep = ${this.options.numToKeep}, existingFiles = ${existingFileDetails.length}`
    );
    debug("_clean: existing files are: ", existingFileDetails);
    if (this._tooManyFiles(existingFileDetails.length)) {
      const fileNamesToRemove = existingFileDetails
        .slice(0, existingFileDetails.length - this.options.numToKeep - 1)
        .map(f => path.format({ dir: this.fileObject.dir, base: f.filename }));
      await deleteFiles(fileNamesToRemove);
    }
  }

  _tooManyFiles(numFiles) {
    return this.options.numToKeep > 0 && numFiles > this.options.numToKeep;
  }
}

const deleteFiles = fileNames => {
  debug(`deleteFiles: files to delete: ${fileNames}`);
  return Promise.all(fileNames.map(f => fs.unlink(f).catch((e) => {
    debug(`deleteFiles: error when unlinking ${f}, ignoring. Error was ${e}`);
  })));
};

module.exports = RollingFileWriteStream;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(62);
} else {
	module.exports = __webpack_require__(65);
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(63)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(64);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(37);
const util = __webpack_require__(16);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(38);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(63)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign(
  {},
  // Export promiseified graceful-fs:
  __webpack_require__(67),
  // Export extra methods:
  __webpack_require__(76),
  __webpack_require__(85),
  __webpack_require__(88),
  __webpack_require__(91),
  __webpack_require__(97),
  __webpack_require__(78),
  __webpack_require__(102),
  __webpack_require__(104),
  __webpack_require__(106),
  __webpack_require__(87),
  __webpack_require__(89)
)

// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const fs = __webpack_require__(7)
if (Object.getOwnPropertyDescriptor(fs, 'promises')) {
  Object.defineProperty(module.exports, 'promises', {
    get () { return fs.promises }
  })
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const u = __webpack_require__(68).fromCallback
const fs = __webpack_require__(69)

const api = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'lchmod',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
].filter(key => {
  // Some commands are not available on some systems. Ex:
  // fs.copyFile was added in Node.js v8.5.0
  // fs.mkdtemp was added in Node.js v5.10.0
  // fs.lchown is not available on at least some Linux
  return typeof fs[key] === 'function'
})

// Export all keys:
Object.keys(fs).forEach(key => {
  if (key === 'promises') {
    // fs.promises is a getter property that triggers ExperimentalWarning
    // Don't re-export it here, the getter is defined in "lib/index.js"
    return
  }
  exports[key] = fs[key]
})

// Universalify async methods:
api.forEach(method => {
  exports[method] = u(fs[method])
})

// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
exports.exists = function (filename, callback) {
  if (typeof callback === 'function') {
    return fs.exists(filename, callback)
  }
  return new Promise(resolve => {
    return fs.exists(filename, resolve)
  })
}

// fs.read() & fs.write need special treatment due to multiple callback args

exports.read = function (fd, buffer, offset, length, position, callback) {
  if (typeof callback === 'function') {
    return fs.read(fd, buffer, offset, length, position, callback)
  }
  return new Promise((resolve, reject) => {
    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
      if (err) return reject(err)
      resolve({ bytesRead, buffer })
    })
  })
}

// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// We need to handle both cases, so we use ...args
exports.write = function (fd, buffer, ...args) {
  if (typeof args[args.length - 1] === 'function') {
    return fs.write(fd, buffer, ...args)
  }

  return new Promise((resolve, reject) => {
    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
      if (err) return reject(err)
      resolve({ bytesWritten, buffer })
    })
  })
}

// fs.realpath.native only available in Node v9.2+
if (typeof fs.realpath.native === 'function') {
  exports.realpath.native = u(fs.realpath.native)
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.fromCallback = function (fn) {
  return Object.defineProperty(function () {
    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
    else {
      return new Promise((resolve, reject) => {
        arguments[arguments.length] = (err, res) => {
          if (err) return reject(err)
          resolve(res)
        }
        arguments.length++
        fn.apply(this, arguments)
      })
    }
  }, 'name', { value: fn.name })
}

exports.fromPromise = function (fn) {
  return Object.defineProperty(function () {
    const cb = arguments[arguments.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, arguments)
    else fn.apply(this, arguments).then(r => cb(null, r), cb)
  }, 'name', { value: fn.name })
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(7)
var polyfills = __webpack_require__(70)
var legacy = __webpack_require__(72)
var clone = __webpack_require__(74)

var util = __webpack_require__(16)

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue
var previousSymbol

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue')
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous')
} else {
  gracefulQueue = '___graceful-fs.queue'
  previousSymbol = '___graceful-fs.previous'
}

function noop () {}

function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  })
}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

// Once time initialization
if (!fs[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue = global[gracefulQueue] || []
  publishQueue(fs, queue)

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          retry()
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments)
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    })
    return close
  })(fs.close)

  fs.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs, arguments)
      retry()
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    })
    return closeSync
  })(fs.closeSync)

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs[gracefulQueue])
      __webpack_require__(75).equal(fs[gracefulQueue].length, 0)
    })
  }
}

if (!global[gracefulQueue]) {
  publishQueue(global, fs[gracefulQueue]);
}

module.exports = patch(clone(fs))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module.exports = patch(fs)
    fs.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch

  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])

      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype)
    ReadStream.prototype.open = ReadStream$open
  }

  var fs$WriteStream = fs.WriteStream
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype)
    WriteStream.prototype.open = WriteStream$open
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  // legacy names
  var FileReadStream = ReadStream
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  var FileWriteStream = WriteStream
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  fs[gracefulQueue].push(elem)
}

function retry () {
  var elem = fs[gracefulQueue].shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(71)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments)
        }
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    read.__proto__ = fs$read
    return read
  })(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants.O_WRONLY | constants.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err)
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2)
          })
        })
      })
    }

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true
      var ret
      try {
        ret = fs.fchmodSync(fd, mode)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }
  }

  function patchLutimes (fs) {
    if (constants.hasOwnProperty("O_SYMLINK")) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er)
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2)
            })
          })
        })
      }

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK)
        var ret
        var threw = true
        try {
          ret = fs.futimesSync(fd, at, mt)
          threw = false
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd)
            } catch (er) {}
          } else {
            fs.closeSync(fd)
          }
        }
        return ret
      }

    } else {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
      fs.lutimesSync = function () {}
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000
          if (stats.gid < 0) stats.gid += 0x100000000
        }
        if (cb) cb.apply(this, arguments)
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(73).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = clone

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  copySync: __webpack_require__(77)
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const mkdirpSync = __webpack_require__(78).mkdirsSync
const utimesSync = __webpack_require__(82).utimesMillisSync
const stat = __webpack_require__(83)

function copySync (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  opts = opts || {}
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy')
  stat.checkParentPathsSync(src, srcStat, dest, 'copy')
  return handleFilterAndCopy(destStat, src, dest, opts)
}

function handleFilterAndCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  const destParent = path.dirname(dest)
  if (!fs.existsSync(destParent)) mkdirpSync(destParent)
  return startCopy(destStat, src, dest, opts)
}

function startCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  return getStats(destStat, src, dest, opts)
}

function getStats (destStat, src, dest, opts) {
  const statSync = opts.dereference ? fs.statSync : fs.lstatSync
  const srcStat = statSync(src)

  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
  else if (srcStat.isFile() ||
           srcStat.isCharacterDevice() ||
           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
}

function onFile (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile(srcStat, src, dest, opts)
  return mayCopyFile(srcStat, src, dest, opts)
}

function mayCopyFile (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs.unlinkSync(dest)
    return copyFile(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile (srcStat, src, dest, opts) {
  if (typeof fs.copyFileSync === 'function') {
    fs.copyFileSync(src, dest)
    fs.chmodSync(dest, srcStat.mode)
    if (opts.preserveTimestamps) {
      return utimesSync(dest, srcStat.atime, srcStat.mtime)
    }
    return
  }
  return copyFileFallback(srcStat, src, dest, opts)
}

function copyFileFallback (srcStat, src, dest, opts) {
  const BUF_LENGTH = 64 * 1024
  const _buff = __webpack_require__(84)(BUF_LENGTH)

  const fdr = fs.openSync(src, 'r')
  const fdw = fs.openSync(dest, 'w', srcStat.mode)
  let pos = 0

  while (pos < srcStat.size) {
    const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

function onDir (srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)
  if (destStat && !destStat.isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
  }
  return copyDir(src, dest, opts)
}

function mkDirAndCopy (srcStat, src, dest, opts) {
  fs.mkdirSync(dest)
  copyDir(src, dest, opts)
  return fs.chmodSync(dest, srcStat.mode)
}

function copyDir (src, dest, opts) {
  fs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts))
}

function copyDirItem (item, src, dest, opts) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy')
  return startCopy(destStat, srcItem, destItem, opts)
}

function onLink (destStat, src, dest, opts) {
  let resolvedSrc = fs.readlinkSync(src)
  if (opts.dereference) {
    resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
  }

  if (!destStat) {
    return fs.symlinkSync(resolvedSrc, dest)
  } else {
    let resolvedDest
    try {
      resolvedDest = fs.readlinkSync(dest)
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
      throw err
    }
    if (opts.dereference) {
      resolvedDest = path.resolve(process.cwd(), resolvedDest)
    }
    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
    }

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
    }
    return copyLink(resolvedSrc, dest)
  }
}

function copyLink (resolvedSrc, dest) {
  fs.unlinkSync(dest)
  return fs.symlinkSync(resolvedSrc, dest)
}

module.exports = copySync


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const u = __webpack_require__(68).fromCallback
const mkdirs = u(__webpack_require__(79))
const mkdirsSync = __webpack_require__(81)

module.exports = {
  mkdirs,
  mkdirsSync,
  // alias
  mkdirp: mkdirs,
  mkdirpSync: mkdirsSync,
  ensureDir: mkdirs,
  ensureDirSync: mkdirsSync
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const invalidWin32Path = __webpack_require__(80).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, er => {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, (er, made) => {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, (er2, stat) => {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(8)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
const INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath,
  invalidWin32Path
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const invalidWin32Path = __webpack_require__(80).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    throw errInval
  }

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    if (err0.code === 'ENOENT') {
      if (path.dirname(p) === p) throw err0
      made = mkdirsSync(path.dirname(p), opts, made)
      mkdirsSync(p, opts, made)
    } else {
      // In the case of any other error, just see if there's a dir there
      // already. If so, then hooray!  If not, then something is borked.
      let stat
      try {
        stat = xfs.statSync(p)
      } catch (err1) {
        throw err0
      }
      if (!stat.isDirectory()) throw err0
    }
  }

  return made
}

module.exports = mkdirsSync


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const os = __webpack_require__(39)
const path = __webpack_require__(8)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  const fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', (err, fd) => {
      if (err) return callback(err)
      fs.futimes(fd, d, d, err => {
        if (err) return callback(err)
        fs.close(fd, err => {
          if (err) return callback(err)
          fs.stat(tmpfile, (err, stats) => {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path, atime, mtime) {
  const fd = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

module.exports = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis,
  utimesMillisSync
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)

const NODE_VERSION_MAJOR_WITH_BIGINT = 10
const NODE_VERSION_MINOR_WITH_BIGINT = 5
const NODE_VERSION_PATCH_WITH_BIGINT = 0
const nodeVersion = process.versions.node.split('.')
const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10)
const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10)
const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10)

function nodeSupportsBigInt () {
  if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
    return true
  } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
    if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
      return true
    } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
      if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
        return true
      }
    }
  }
  return false
}

function getStats (src, dest, cb) {
  if (nodeSupportsBigInt()) {
    fs.stat(src, { bigint: true }, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  } else {
    fs.stat(src, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  }
}

function getStatsSync (src, dest) {
  let srcStat, destStat
  if (nodeSupportsBigInt()) {
    srcStat = fs.statSync(src, { bigint: true })
  } else {
    srcStat = fs.statSync(src)
  }
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(dest, { bigint: true })
    } else {
      destStat = fs.statSync(dest)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src, dest, funcName, cb) {
  getStats(src, dest, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      return cb(new Error('Source and destination must not be the same.'))
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return cb(null, { srcStat, destStat })
  })
}

function checkPathsSync (src, dest, funcName) {
  const { srcStat, destStat } = getStatsSync(src, dest)
  if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error('Source and destination must not be the same.')
  }
  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
function checkParentPaths (src, srcStat, dest, funcName, cb) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
  if (nodeSupportsBigInt()) {
    fs.stat(destParent, { bigint: true }, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  } else {
    fs.stat(destParent, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  }
}

function checkParentPathsSync (src, srcStat, dest, funcName) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return
  let destStat
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(destParent, { bigint: true })
    } else {
      destStat = fs.statSync(destParent)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src, dest) {
  const srcArr = path.resolve(src).split(path.sep).filter(i => i)
  const destArr = path.resolve(dest).split(path.sep).filter(i => i)
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
}

function errMsg (src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

module.exports = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable node/no-deprecated-api */
module.exports = function (size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    try {
      return Buffer.allocUnsafe(size)
    } catch (e) {
      return new Buffer(size)
    }
  }
  return new Buffer(size)
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
module.exports = {
  copy: u(__webpack_require__(86))
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const mkdirp = __webpack_require__(78).mkdirs
const pathExists = __webpack_require__(87).pathExists
const utimes = __webpack_require__(82).utimesMillis
const stat = __webpack_require__(83)

function copy (src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts
    opts = {}
  } else if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  cb = cb || function () {}
  opts = opts || {}

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  stat.checkPaths(src, dest, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', err => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat, src, dest, opts, cb) {
  const destParent = path.dirname(dest)
  pathExists(destParent, (err, dirExists) => {
    if (err) return cb(err)
    if (dirExists) return startCopy(destStat, src, dest, opts, cb)
    mkdirp(destParent, err => {
      if (err) return cb(err)
      return startCopy(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude, destStat, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest)).then(include => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, error => cb(error))
}

function startCopy (destStat, src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat, src, dest, opts, cb) {
  const stat = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err, srcStat) => {
    if (err) return cb(err)

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isFile() ||
             srcStat.isCharacterDevice() ||
             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
  })
}

function onFile (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    fs.unlink(dest, err => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat, src, dest, opts, cb) {
  if (typeof fs.copyFile === 'function') {
    return fs.copyFile(src, dest, err => {
      if (err) return cb(err)
      return setDestModeAndTimestamps(srcStat, dest, opts, cb)
    })
  }
  return copyFileFallback(srcStat, src, dest, opts, cb)
}

function copyFileFallback (srcStat, src, dest, opts, cb) {
  const rs = fs.createReadStream(src)
  rs.on('error', err => cb(err)).once('open', () => {
    const ws = fs.createWriteStream(dest, { mode: srcStat.mode })
    ws.on('error', err => cb(err))
      .on('open', () => rs.pipe(ws))
      .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))
  })
}

function setDestModeAndTimestamps (srcStat, dest, opts, cb) {
  fs.chmod(dest, srcStat.mode, err => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) {
      return utimes(dest, srcStat.atime, srcStat.mtime, cb)
    }
    return cb()
  })
}

function onDir (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb)
  if (destStat && !destStat.isDirectory()) {
    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
  }
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcStat, src, dest, opts, cb) {
  fs.mkdir(dest, err => {
    if (err) return cb(err)
    copyDir(src, dest, opts, err => {
      if (err) return cb(err)
      return fs.chmod(dest, srcStat.mode, cb)
    })
  })
}

function copyDir (src, dest, opts, cb) {
  fs.readdir(src, (err, items) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items, src, dest, opts, cb) {
  const item = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items, item, src, dest, opts, cb) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, err => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat, src, dest, opts, cb) {
  fs.readlink(src, (err, resolvedSrc) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err, resolvedDest) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)
          return cb(err)
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest)
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
        }

        // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
        }
        return copyLink(resolvedSrc, dest, cb)
      })
    }
  })
}

function copyLink (resolvedSrc, dest, cb) {
  fs.unlink(dest, err => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

module.exports = copy


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const u = __webpack_require__(68).fromPromise
const fs = __webpack_require__(67)

function pathExists (path) {
  return fs.access(path).then(() => true).catch(() => false)
}

module.exports = {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const mkdir = __webpack_require__(78)
const remove = __webpack_require__(89)

const emptyDir = u(function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, (err, items) => {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(item => path.join(dir, item))

    deleteItem()

    function deleteItem () {
      const item = items.pop()
      if (!item) return callback()
      remove.remove(item, err => {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
})

function emptyDirSync (dir) {
  let items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const rimraf = __webpack_require__(90)

module.exports = {
  remove: u(rimraf),
  removeSync: rimraf.sync
}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const assert = __webpack_require__(75)

const isWindows = (process.platform === 'win32')

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
}

function rimraf (p, options, cb) {
  let busyTries = 0

  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  rimraf_(p, options, function CB (er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++
        const time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null
    }

    cb(er)
  })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er) {
    assert(er instanceof Error)
  }

  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er)
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er)
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb)
        } else {
          options.unlink(p, cb)
        }
      })
    }
  })
}

function fixWinEPERMSync (p, options, er) {
  let stats

  assert(p)
  assert(options)
  if (er) {
    assert(er instanceof Error)
  }

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er)
  } else {
    options.unlinkSync(p)
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb)
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr)
    } else {
      cb(er)
    }
  })
}

function rmkids (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length
    let errState

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb)
        }
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st

  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  try {
    st = options.lstatSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er)
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null)
    } else {
      options.unlinkSync(p)
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er)
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options)
    } else if (er.code !== 'ENOENT') {
      throw er
    }
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  if (isWindows) {
    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const startTime = Date.now()
    do {
      try {
        const ret = options.rmdirSync(p, options)
        return ret
      } catch (er) { }
    } while (Date.now() - startTime < 500) // give up after 500ms
  } else {
    const ret = options.rmdirSync(p, options)
    return ret
  }
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const file = __webpack_require__(92)
const link = __webpack_require__(93)
const symlink = __webpack_require__(94)

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const path = __webpack_require__(8)
const fs = __webpack_require__(69)
const mkdir = __webpack_require__(78)
const pathExists = __webpack_require__(87).pathExists

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = path.dirname(file)
    pathExists(dir, (err, dirExists) => {
      if (err) return callback(err)
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  let stats
  try {
    stats = fs.statSync(file)
  } catch (e) {}
  if (stats && stats.isFile()) return

  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: u(createFile),
  createFileSync
}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const path = __webpack_require__(8)
const fs = __webpack_require__(69)
const mkdir = __webpack_require__(78)
const pathExists = __webpack_require__(87).pathExists

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null)
    })
  }

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      const dir = path.dirname(dstpath)
      pathExists(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir = path.dirname(dstpath)
  const dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: u(createLink),
  createLinkSync
}


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const path = __webpack_require__(8)
const fs = __webpack_require__(69)
const _mkdirs = __webpack_require__(78)
const mkdirs = _mkdirs.mkdirs
const mkdirsSync = _mkdirs.mkdirsSync

const _symlinkPaths = __webpack_require__(95)
const symlinkPaths = _symlinkPaths.symlinkPaths
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

const _symlinkType = __webpack_require__(96)
const symlinkType = _symlinkType.symlinkType
const symlinkTypeSync = _symlinkType.symlinkTypeSync

const pathExists = __webpack_require__(87).pathExists

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err)
        const dir = path.dirname(dstpath)
        pathExists(dir, (err, dirExists) => {
          if (err) return callback(err)
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, err => {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = path.dirname(dstpath)
  const exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: u(createSymlink),
  createSymlinkSync
}


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(8)
const fs = __webpack_require__(69)
const pathExists = __webpack_require__(87).pathExists

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    return pathExists(relativeToDst, (err, exists) => {
      if (err) return callback(err)
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  let exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  symlinkPaths,
  symlinkPathsSync
}


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  let stats

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType,
  symlinkTypeSync
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const jsonFile = __webpack_require__(98)

jsonFile.outputJson = u(__webpack_require__(100))
jsonFile.outputJsonSync = __webpack_require__(101)
// aliases
jsonFile.outputJSON = jsonFile.outputJson
jsonFile.outputJSONSync = jsonFile.outputJsonSync
jsonFile.writeJSON = jsonFile.writeJson
jsonFile.writeJSONSync = jsonFile.writeJsonSync
jsonFile.readJSON = jsonFile.readJson
jsonFile.readJSONSync = jsonFile.readJsonSync

module.exports = jsonFile


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const jsonFile = __webpack_require__(99)

module.exports = {
  // jsonfile exports
  readJson: u(jsonFile.readFile),
  readJsonSync: jsonFile.readFileSync,
  writeJson: u(jsonFile.writeFile),
  writeJsonSync: jsonFile.writeFileSync
}


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var _fs
try {
  _fs = __webpack_require__(69)
} catch (_) {
  _fs = __webpack_require__(7)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  try {
    var content = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function stringify (obj, options) {
  var spaces
  var EOL = '\n'
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options.spaces
    }
    if (options.EOL) {
      EOL = options.EOL
    }
  }

  var str = JSON.stringify(obj, options ? options.replacer : null, spaces)

  return str.replace(/\n/g, EOL) + EOL
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var str = ''
  try {
    str = stringify(obj, options)
  } catch (err) {
    // Need to return whether a callback was passed or not
    if (callback) callback(err, null)
    return
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var str = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(8)
const mkdir = __webpack_require__(78)
const pathExists = __webpack_require__(87).pathExists
const jsonFile = __webpack_require__(98)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const dir = path.dirname(file)

  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const mkdir = __webpack_require__(78)
const jsonFile = __webpack_require__(98)

function outputJsonSync (file, data, options) {
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  moveSync: __webpack_require__(103)
}


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const copySync = __webpack_require__(76).copySync
const removeSync = __webpack_require__(89).removeSync
const mkdirpSync = __webpack_require__(78).mkdirpSync
const stat = __webpack_require__(83)

function moveSync (src, dest, opts) {
  opts = opts || {}
  const overwrite = opts.overwrite || opts.clobber || false

  const { srcStat } = stat.checkPathsSync(src, dest, 'move')
  stat.checkParentPathsSync(src, srcStat, dest, 'move')
  mkdirpSync(path.dirname(dest))
  return doRename(src, dest, overwrite)
}

function doRename (src, dest, overwrite) {
  if (overwrite) {
    removeSync(dest)
    return rename(src, dest, overwrite)
  }
  if (fs.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src, dest, overwrite) {
  try {
    fs.renameSync(src, dest)
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copySync(src, dest, opts)
  return removeSync(src)
}

module.exports = moveSync


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
module.exports = {
  move: u(__webpack_require__(105))
}


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const copy = __webpack_require__(85).copy
const remove = __webpack_require__(89).remove
const mkdirp = __webpack_require__(78).mkdirp
const pathExists = __webpack_require__(87).pathExists
const stat = __webpack_require__(83)

function move (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  const overwrite = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', (err, stats) => {
    if (err) return cb(err)
    const { srcStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err)
      mkdirp(path.dirname(dest), err => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, cb)
      })
    })
  })
}

function doRename (src, dest, overwrite, cb) {
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err, destExists) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src, dest, overwrite, cb) {
  fs.rename(src, dest, err => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, err => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

module.exports = move


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const u = __webpack_require__(68).fromCallback
const fs = __webpack_require__(69)
const path = __webpack_require__(8)
const mkdir = __webpack_require__(78)
const pathExists = __webpack_require__(87).pathExists

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, ...args) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync(file, ...args)
}

module.exports = {
  outputFile: u(outputFile),
  outputFileSync
}


/***/ }),
/* 107 */
/***/ (function(module, exports) {

// allows us to inject a mock date in tests
module.exports = () => new Date();


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(61)("streamroller:fileNameFormatter");
const path = __webpack_require__(8);
const FILENAME_SEP = ".";
const ZIP_EXT = ".gz";

module.exports = ({
  file,
  keepFileExt,
  needsIndex,
  alwaysIncludeDate,
  compress
}) => {
  const dirAndName = path.join(file.dir, file.name);

  const ext = f => f + file.ext;

  const index = (f, i, d) =>
    (needsIndex || !d) && i ? f + FILENAME_SEP + i : f;

  const date = (f, i, d) => {
    return (i > 0 || alwaysIncludeDate) && d ? f + FILENAME_SEP + d : f;
  };

  const gzip = (f, i) => (i && compress ? f + ZIP_EXT : f);

  const parts = keepFileExt
    ? [date, index, ext, gzip]
    : [ext, date, index, gzip];

  return ({ date, index }) => {
    debug(`_formatFileName: date=${date}, index=${index}`);
    return parts.reduce(
      (filename, part) => part(filename, index, date),
      dirAndName
    );
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(61)("streamroller:fileNameParser");
const FILENAME_SEP = ".";
const ZIP_EXT = ".gz";
const format = __webpack_require__(44);

module.exports = ({ file, keepFileExt, pattern }) => {
  // All these functions take two arguments: f, the filename, and p, the result placeholder
  // They return the filename with any matching parts removed.
  // The "zip" function, for instance, removes the ".gz" part of the filename (if present)
  const zip = (f, p) => {
    if (f.endsWith(ZIP_EXT)) {
      debug("it is gzipped");
      p.isCompressed = true;
      return f.slice(0, -1 * ZIP_EXT.length);
    }
    return f;
  };

  const __NOT_MATCHING__ = "__NOT_MATCHING__";

  const extAtEnd = f => {
    if (f.startsWith(file.name) && f.endsWith(file.ext)) {
      debug("it starts and ends with the right things");
      return f.slice(file.name.length + 1, -1 * file.ext.length);
    }
    return __NOT_MATCHING__;
  };

  const extInMiddle = f => {
    if (f.startsWith(file.base)) {
      debug("it starts with the right things");
      return f.slice(file.base.length + 1);
    }
    return __NOT_MATCHING__;
  };

  const dateAndIndex = (f, p) => {
    const items = f.split(FILENAME_SEP);
    let indexStr = items[items.length - 1];
    debug("items: ", items, ", indexStr: ", indexStr);
    let dateStr = f;
    if (indexStr !== undefined && indexStr.match(/^\d+$/)) {
      dateStr = f.slice(0, -1 * (indexStr.length + 1));
      debug(`dateStr is ${dateStr}`);
      if (pattern && !dateStr) {
        dateStr = indexStr;
        indexStr = "0";
      }
    } else {
      indexStr = "0";
    }

    try {
      // Two arguments for new Date() are intentional. This will set other date
      // components to minimal values in the current timezone instead of UTC,
      // as new Date(0) will do.
      const date = format.parse(pattern, dateStr, new Date(0, 0));
      if (format.asString(pattern, date) !== dateStr) return f;
      p.index = parseInt(indexStr, 10);
      p.date = dateStr;
      p.timestamp = date.getTime();
      return "";
    } catch (e) {
      //not a valid date, don't panic.
      debug(`Problem parsing ${dateStr} as ${pattern}, error was: `, e);
      return f;
    }
  };

  const index = (f, p) => {
    if (f.match(/^\d+$/)) {
      debug("it has an index");
      p.index = parseInt(f, 10);
      return "";
    }
    return f;
  };

  let parts = [
    zip,
    keepFileExt ? extAtEnd : extInMiddle,
    pattern ? dateAndIndex : index
  ];

  return filename => {
    let result = { filename, index: 0, isCompressed: false };
    // pass the filename through each of the file part parsers
    let whatsLeftOver = parts.reduce(
      (remains, part) => part(remains, result),
      filename
    );
    // if there's anything left after parsing, then it wasn't a valid filename
    return whatsLeftOver ? null : result;
  };
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(61)('streamroller:moveAndMaybeCompressFile');
const fs = __webpack_require__(66);
const zlib = __webpack_require__(111);

const moveAndMaybeCompressFile = async (
  sourceFilePath,
  targetFilePath,
  needCompress
) => {
  if (sourceFilePath === targetFilePath) {
    debug(
      `moveAndMaybeCompressFile: source and target are the same, not doing anything`
    );
    return;
  }
    if (await fs.pathExists(sourceFilePath)) {

      debug(
        `moveAndMaybeCompressFile: moving file from ${sourceFilePath} to ${targetFilePath} ${
          needCompress ? "with" : "without"
        } compress`
      );
      if (needCompress) {
        await new Promise((resolve, reject) => {
          fs.createReadStream(sourceFilePath)
            .pipe(zlib.createGzip())
            .pipe(fs.createWriteStream(targetFilePath))
            .on("finish", () => {
              debug(
                `moveAndMaybeCompressFile: finished compressing ${targetFilePath}, deleting ${sourceFilePath}`
              );
              fs.unlink(sourceFilePath)
                .then(resolve)
                .catch(() => {
                  debug(`Deleting ${sourceFilePath} failed, truncating instead`);
                  fs.truncate(sourceFilePath).then(resolve).catch(reject)
                });
            });
        });
      } else {
        debug(
          `moveAndMaybeCompressFile: deleting file=${targetFilePath}, renaming ${sourceFilePath} to ${targetFilePath}`
        );
        try {
          await fs.move(sourceFilePath, targetFilePath, { overwrite: true });
        } catch (e) {
          debug(
            `moveAndMaybeCompressFile: error moving ${sourceFilePath} to ${targetFilePath}`, e
          );
          debug(`Trying copy+truncate instead`);
          await fs.copy(sourceFilePath, targetFilePath, { overwrite: true });
          await fs.truncate(sourceFilePath);
        }
      }
    }
};

module.exports = moveAndMaybeCompressFile;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

const RollingFileWriteStream = __webpack_require__(60);

// just to adapt the previous version
class RollingFileStream extends RollingFileWriteStream {
  constructor(filename, size, backups, options) {
    if (!options) {
      options = {};
    }
    if (size) {
      options.maxSize = size;
    }
    if (!backups) {
      backups = 1;
    }
    options.numToKeep = backups;
    super(filename, options);
    this.backups = this.options.numToKeep;
    this.size = this.options.maxSize;
  }

  get theStream() {
    return this.currentFileStream;
  }

}

module.exports = RollingFileStream;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

const RollingFileWriteStream = __webpack_require__(60);

// just to adapt the previous version
class DateRollingFileStream extends RollingFileWriteStream {
  constructor(filename, pattern, options) {
    if (pattern && typeof(pattern) === 'object') {
      options = pattern;
      pattern = null;
    }
    if (!options) {
      options = {};
    }
    if (!pattern) {
      pattern = 'yyyy-MM-dd';
    }
    if (options.daysToKeep) {
      options.numToKeep = options.daysToKeep;
    }
    if (pattern.startsWith('.')) {
      pattern = pattern.substring(1);
    }
    options.pattern = pattern;
    super(filename, options);
    this.mode = this.options.mode;
  }

  get theStream() {
    return this.currentFileStream;
  }

}

module.exports = DateRollingFileStream;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

const streams = __webpack_require__(59);
const os = __webpack_require__(39);

const eol = os.EOL || '\n';

/**
 * File appender that rolls files according to a date pattern.
 * @filename base filename.
 * @pattern the format that will be added to the end of filename when rolling,
 *          also used to check when to roll files - defaults to '.yyyy-MM-dd'
 * @layout layout function for log messages - defaults to basicLayout
 * @timezoneOffset optional timezone offset in minutes - defaults to system local
 */
function appender(
  filename,
  pattern,
  layout,
  options,
  timezoneOffset
) {
  // the options for file appender use maxLogSize, but the docs say any file appender
  // options should work for dateFile as well.
  options.maxSize = options.maxLogSize;

  const logFile = new streams.DateRollingFileStream(
    filename,
    pattern,
    options
  );

  const app = function (logEvent) {
    logFile.write(layout(logEvent, timezoneOffset) + eol, 'utf8');
  };

  app.shutdown = function (complete) {
    logFile.write('', 'utf-8', () => {
      logFile.end(complete);
    });
  };

  return app;
}

function configure(config, layouts) {
  let layout = layouts.basicLayout;

  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  if (!config.alwaysIncludePattern) {
    config.alwaysIncludePattern = false;
  }

  return appender(
    config.filename,
    config.pattern,
    layout,
    config,
    config.timezoneOffset
  );
}

module.exports.configure = configure;


/***/ }),
/* 115 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 115;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(32)('log4js:categories');
const configuration = __webpack_require__(42);
const levels = __webpack_require__(45);
const appenders = __webpack_require__(46);

const categories = new Map();

/**
 * Add inherited config to this category.  That includes extra appenders from parent,
 * and level, if none is set on this category.
 * This is recursive, so each parent also gets loaded with inherited appenders.
 * Inheritance is blocked if a category has inherit=false
 * @param  {any} config
 * @param  {any} category the child category
 * @param  {string} categoryName dotted path to category
 * @return {void}
 */
function inheritFromParent(config, category, categoryName) {
  if (category.inherit === false) return;
  const lastDotIndex = categoryName.lastIndexOf('.');
  if (lastDotIndex < 0) return; // category is not a child
  const parentCategoryName = categoryName.substring(0, lastDotIndex);
  let parentCategory = config.categories[parentCategoryName];


  if (!parentCategory) {
    // parent is missing, so implicitly create it, so that it can inherit from its parents
    parentCategory = { inherit: true, appenders: [] };
  }

  // make sure parent has had its inheritance taken care of before pulling its properties to this child
  inheritFromParent(config, parentCategory, parentCategoryName);

  // if the parent is not in the config (because we just created it above),
  // and it inherited a valid configuration, add it to config.categories
  if (!config.categories[parentCategoryName]
    && parentCategory.appenders
    && parentCategory.appenders.length
    && parentCategory.level) {
    config.categories[parentCategoryName] = parentCategory;
  }

  category.appenders = category.appenders || [];
  category.level = category.level || parentCategory.level;

  // merge in appenders from parent (parent is already holding its inherited appenders)
  parentCategory.appenders.forEach((ap) => {
    if (!category.appenders.includes(ap)) {
      category.appenders.push(ap);
    }
  });
  category.parent = parentCategory;
}


/**
 * Walk all categories in the config, and pull down any configuration from parent to child.
 * This includes inherited appenders, and level, where level is not set.
 * Inheritance is skipped where a category has inherit=false.
 * @param  {any} config
 */
function addCategoryInheritance(config) {
  if (!config.categories) return;
  const categoryNames = Object.keys(config.categories);
  categoryNames.forEach((name) => {
    const category = config.categories[name];
    // add inherited appenders and level to this category
    inheritFromParent(config, category, name);
  });
}

configuration.addPreProcessingListener(config => addCategoryInheritance(config));

configuration.addListener((config) => {
  configuration.throwExceptionIf(
    config,
    configuration.not(configuration.anObject(config.categories)),
    'must have a property "categories" of type object.'
  );

  const categoryNames = Object.keys(config.categories);
  configuration.throwExceptionIf(
    config,
    configuration.not(categoryNames.length),
    'must define at least one category.'
  );

  categoryNames.forEach((name) => {
    const category = config.categories[name];
    configuration.throwExceptionIf(
      config,
      [
        configuration.not(category.appenders),
        configuration.not(category.level)
      ],
      `category "${name}" is not valid (must be an object with properties "appenders" and "level")`
    );

    configuration.throwExceptionIf(
      config,
      configuration.not(Array.isArray(category.appenders)),
      `category "${name}" is not valid (appenders must be an array of appender names)`
    );

    configuration.throwExceptionIf(
      config,
      configuration.not(category.appenders.length),
      `category "${name}" is not valid (appenders must contain at least one appender name)`
    );

    if (Object.prototype.hasOwnProperty.call(category, 'enableCallStack')) {
      configuration.throwExceptionIf(
        config,
        typeof category.enableCallStack !== 'boolean',
        `category "${name}" is not valid (enableCallStack must be boolean type)`
      );
    }

    category.appenders.forEach((appender) => {
      configuration.throwExceptionIf(
        config,
        configuration.not(appenders.get(appender)),
        `category "${name}" is not valid (appender "${appender}" is not defined)`
      );
    });

    configuration.throwExceptionIf(
      config,
      configuration.not(levels.getLevel(category.level)),
      `category "${name}" is not valid (level "${category.level}" not recognised;`
      + ` valid levels are ${levels.levels.join(', ')})`
    );
  });

  configuration.throwExceptionIf(
    config,
    configuration.not(config.categories.default),
    'must define a "default" category.'
  );
});

const setup = (config) => {
  categories.clear();

  const categoryNames = Object.keys(config.categories);
  categoryNames.forEach((name) => {
    const category = config.categories[name];
    const categoryAppenders = [];
    category.appenders.forEach((appender) => {
      categoryAppenders.push(appenders.get(appender));
      debug(`Creating category ${name}`);
      categories.set(
        name,
        {
          appenders: categoryAppenders,
          level: levels.getLevel(category.level),
          enableCallStack: category.enableCallStack || false
        }
      );
    });
  });
};

setup({ categories: { default: { appenders: ['out'], level: 'OFF' } } });
configuration.addListener(setup);

const configForCategory = (category) => {
  debug(`configForCategory: searching for config for ${category}`);
  if (categories.has(category)) {
    debug(`configForCategory: ${category} exists in config, returning it`);
    return categories.get(category);
  }
  if (category.indexOf('.') > 0) {
    debug(`configForCategory: ${category} has hierarchy, searching for parents`);
    return configForCategory(category.substring(0, category.lastIndexOf('.')));
  }
  debug('configForCategory: returning config for default category');
  return configForCategory('default');
};

const appendersForCategory = category => configForCategory(category).appenders;
const getLevelForCategory = category => configForCategory(category).level;

const setLevelForCategory = (category, level) => {
  let categoryConfig = categories.get(category);
  debug(`setLevelForCategory: found ${categoryConfig} for ${category}`);
  if (!categoryConfig) {
    const sourceCategoryConfig = configForCategory(category);
    debug('setLevelForCategory: no config found for category, '
      + `found ${sourceCategoryConfig} for parents of ${category}`);
    categoryConfig = { appenders: sourceCategoryConfig.appenders };
  }
  categoryConfig.level = level;
  categories.set(category, categoryConfig);
};

const getEnableCallStackForCategory = category => configForCategory(category).enableCallStack === true;
const setEnableCallStackForCategory = (category, useCallStack) => {
  configForCategory(category).enableCallStack = useCallStack;
};

module.exports = {
  appendersForCategory,
  getLevelForCategory,
  setLevelForCategory,
  getEnableCallStackForCategory,
  setEnableCallStackForCategory,
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-underscore-dangle:0 */
const debug = __webpack_require__(32)("log4js:logger");
const LoggingEvent = __webpack_require__(48);
const levels = __webpack_require__(45);
const clustering = __webpack_require__(47);
const categories = __webpack_require__(116);
const configuration = __webpack_require__(42);

const stackReg = /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/;
function defaultParseCallStack(data, skipIdx = 4) {
  const stacklines = data.stack.split("\n").slice(skipIdx);
  const lineMatch = stackReg.exec(stacklines[0]);
  if (lineMatch && lineMatch.length === 6) {
    return {
      functionName: lineMatch[1],
      fileName: lineMatch[2],
      lineNumber: parseInt(lineMatch[3], 10),
      columnNumber: parseInt(lineMatch[4], 10),
      callStack: stacklines.join("\n")
    };
  }
  return null;
}

/**
 * Logger to log messages.
 * use {@see log4js#getLogger(String)} to get an instance.
 *
 * @name Logger
 * @namespace Log4js
 * @param name name of category to log to
 * @param level - the loglevel for the category
 * @param dispatch - the function which will receive the logevents
 *
 * @author Stephan Strittmatter
 */
class Logger {
  constructor(name) {
    if (!name) {
      throw new Error("No category provided.");
    }
    this.category = name;
    this.context = {};
    this.parseCallStack = defaultParseCallStack;
    debug(`Logger created (${this.category}, ${this.level})`);
  }

  get level() {
    return levels.getLevel(
      categories.getLevelForCategory(this.category),
      levels.TRACE
    );
  }

  set level(level) {
    categories.setLevelForCategory(
      this.category,
      levels.getLevel(level, this.level)
    );
  }

  get useCallStack() {
    return categories.getEnableCallStackForCategory(this.category);
  }

  set useCallStack(bool) {
    categories.setEnableCallStackForCategory(this.category, bool === true);
  }

  log(level, ...args) {
    const logLevel = levels.getLevel(level, levels.INFO);
    if (this.isLevelEnabled(logLevel)) {
      this._log(logLevel, args);
    }
  }

  isLevelEnabled(otherLevel) {
    return this.level.isLessThanOrEqualTo(otherLevel);
  }

  _log(level, data) {
    debug(`sending log data (${level}) to appenders`);
    const loggingEvent = new LoggingEvent(
      this.category,
      level,
      data,
      this.context,
      this.useCallStack && this.parseCallStack(new Error())
    );
    clustering.send(loggingEvent);
  }

  addContext(key, value) {
    this.context[key] = value;
  }

  removeContext(key) {
    delete this.context[key];
  }

  clearContext() {
    this.context = {};
  }

  setParseCallStackFunction(parseFunction) {
    this.parseCallStack = parseFunction;
  }
}

function addLevelMethods(target) {
  const level = levels.getLevel(target);

  const levelStrLower = level.toString().toLowerCase();
  const levelMethod = levelStrLower.replace(/_([a-z])/g, g =>
    g[1].toUpperCase()
  );
  const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);

  Logger.prototype[`is${isLevelMethod}Enabled`] = function() {
    return this.isLevelEnabled(level);
  };

  Logger.prototype[levelMethod] = function(...args) {
    this.log(level, ...args);
  };
}

levels.levels.forEach(addLevelMethods);

configuration.addListener(() => {
  levels.levels.forEach(addLevelMethods);
});

module.exports = Logger;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-plusplus */

const levels = __webpack_require__(45);

const DEFAULT_FORMAT =
  ":remote-addr - -" +
  ' ":method :url HTTP/:http-version"' +
  ' :status :content-length ":referrer"' +
  ' ":user-agent"';

/**
 * Return request url path,
 * adding this function prevents the Cyclomatic Complexity,
 * for the assemble_tokens function at low, to pass the tests.
 *
 * @param  {IncomingMessage} req
 * @return {String}
 * @api private
 */
function getUrl(req) {
  return req.originalUrl || req.url;
}

/**
 * Adds custom {token, replacement} objects to defaults,
 * overwriting the defaults if any tokens clash
 *
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {Array} customTokens
 *    [{ token: string-or-regexp, replacement: string-or-replace-function }]
 * @return {Array}
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = array => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        // not === because token can be regexp object
        /* eslint eqeqeq:0 */
        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  };

  const defaultTokens = [];
  defaultTokens.push({ token: ":url", replacement: getUrl(req) });
  defaultTokens.push({ token: ":protocol", replacement: req.protocol });
  defaultTokens.push({ token: ":hostname", replacement: req.hostname });
  defaultTokens.push({ token: ":method", replacement: req.method });
  defaultTokens.push({
    token: ":status",
    replacement: res.__statusCode || res.statusCode
  });
  defaultTokens.push({
    token: ":response-time",
    replacement: res.responseTime
  });
  defaultTokens.push({ token: ":date", replacement: new Date().toUTCString() });
  defaultTokens.push({
    token: ":referrer",
    replacement: req.headers.referer || req.headers.referrer || ""
  });
  defaultTokens.push({
    token: ":http-version",
    replacement: `${req.httpVersionMajor}.${req.httpVersionMinor}`
  });
  defaultTokens.push({
    token: ":remote-addr",
    replacement:
      req.headers["x-forwarded-for"] ||
      req.ip ||
      req._remoteAddress ||
      (req.socket &&
        (req.socket.remoteAddress ||
          (req.socket.socket && req.socket.socket.remoteAddress)))
  });
  defaultTokens.push({
    token: ":user-agent",
    replacement: req.headers["user-agent"]
  });
  defaultTokens.push({
    token: ":content-length",
    replacement:
      res.getHeader("content-length") ||
      (res.__headers && res.__headers["Content-Length"]) ||
      "-"
  });
  defaultTokens.push({
    token: /:req\[([^\]]+)]/g,
    replacement(_, field) {
      return req.headers[field.toLowerCase()];
    }
  });
  defaultTokens.push({
    token: /:res\[([^\]]+)]/g,
    replacement(_, field) {
      return (
        res.getHeader(field.toLowerCase()) ||
        (res.__headers && res.__headers[field])
      );
    }
  });

  return arrayUniqueTokens(customTokens.concat(defaultTokens));
}

/**
 * Return formatted log line.
 *
 * @param  {String} str
 * @param {Array} tokens
 * @return {String}
 * @api private
 */
function format(str, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    str = str.replace(tokens[i].token, tokens[i].replacement);
  }
  return str;
}

/**
 * Return RegExp Object about nolog
 *
 * @param  {String|Array} nolog
 * @return {RegExp}
 * @api private
 *
 * syntax
 *  1. String
 *   1.1 "\\.gif"
 *         NOT LOGGING http://example.com/hoge.gif and http://example.com/hoge.gif?fuga
 *         LOGGING http://example.com/hoge.agif
 *   1.2 in "\\.gif|\\.jpg$"
 *         NOT LOGGING http://example.com/hoge.gif and
 *           http://example.com/hoge.gif?fuga and http://example.com/hoge.jpg?fuga
 *         LOGGING http://example.com/hoge.agif,
 *           http://example.com/hoge.ajpg and http://example.com/hoge.jpg?hoge
 *   1.3 in "\\.(gif|jpe?g|png)$"
 *         NOT LOGGING http://example.com/hoge.gif and http://example.com/hoge.jpeg
 *         LOGGING http://example.com/hoge.gif?uid=2 and http://example.com/hoge.jpg?pid=3
 *  2. RegExp
 *   2.1 in /\.(gif|jpe?g|png)$/
 *         SAME AS 1.3
 *  3. Array
 *   3.1 ["\\.jpg$", "\\.png", "\\.gif"]
 *         SAME AS "\\.jpg|\\.png|\\.gif"
 */
function createNoLogCondition(nolog) {
  let regexp = null;

  if (nolog instanceof RegExp) {
    regexp = nolog;
  }

  if (typeof nolog === "string") {
    regexp = new RegExp(nolog);
  }

  if (Array.isArray(nolog)) {
    // convert to strings
    const regexpsAsStrings = nolog.map(reg => (reg.source ? reg.source : reg));
    regexp = new RegExp(regexpsAsStrings.join("|"));
  }

  return regexp;
}

/**
 * Allows users to define rules around status codes to assign them to a specific
 * logging level.
 * There are two types of rules:
 *   - RANGE: matches a code within a certain range
 *     E.g. { 'from': 200, 'to': 299, 'level': 'info' }
 *   - CONTAINS: matches a code to a set of expected codes
 *     E.g. { 'codes': [200, 203], 'level': 'debug' }
 * Note*: Rules are respected only in order of prescendence.
 *
 * @param {Number} statusCode
 * @param {Level} currentLevel
 * @param {Object} ruleSet
 * @return {Level}
 * @api private
 */
function matchRules(statusCode, currentLevel, ruleSet) {
  let level = currentLevel;

  if (ruleSet) {
    const matchedRule = ruleSet.find(rule => {
      let ruleMatched = false;
      if (rule.from && rule.to) {
        ruleMatched = statusCode >= rule.from && statusCode <= rule.to;
      } else {
        ruleMatched = rule.codes.indexOf(statusCode) !== -1;
      }
      return ruleMatched;
    });
    if (matchedRule) {
      level = levels.getLevel(matchedRule.level, level);
    }
  }
  return level;
}

/**
 * Log requests with the given `options` or a `format` string.
 *
 * Options:
 *
 *   - `format`        Format string, see below for tokens
 *   - `level`         A log4js levels instance. Supports also 'auto'
 *   - `nolog`         A string or RegExp to exclude target logs
 *   - `statusRules`   A array of rules for setting specific logging levels base on status codes
 *   - `context`       Whether to add a response of express to the context
 *
 * Tokens:
 *
 *   - `:req[header]` ex: `:req[Accept]`
 *   - `:res[header]` ex: `:res[Content-Length]`
 *   - `:http-version`
 *   - `:response-time`
 *   - `:remote-addr`
 *   - `:date`
 *   - `:method`
 *   - `:url`
 *   - `:referrer`
 *   - `:user-agent`
 *   - `:status`
 *
 * @return {Function}
 * @param logger4js
 * @param options
 * @api public
 */
module.exports = function getLogger(logger4js, options) {
  /* eslint no-underscore-dangle:0 */
  if (typeof options === "string" || typeof options === "function") {
    options = { format: options };
  } else {
    options = options || {};
  }

  const thisLogger = logger4js;
  let level = levels.getLevel(options.level, levels.INFO);
  const fmt = options.format || DEFAULT_FORMAT;
  const nolog = createNoLogCondition(options.nolog);

  return (req, res, next) => {
    // mount safety
    if (req._logging) return next();

    // nologs
    if (nolog && nolog.test(req.originalUrl)) return next();

    if (thisLogger.isLevelEnabled(level) || options.level === "auto") {
      const start = new Date();
      const { writeHead } = res;

      // flag as logging
      req._logging = true;

      // proxy for statusCode.
      res.writeHead = (code, headers) => {
        res.writeHead = writeHead;
        res.writeHead(code, headers);

        res.__statusCode = code;
        res.__headers = headers || {};
      };

      // hook on end request to emit the log entry of the HTTP request.
      res.on("finish", () => {
        res.responseTime = new Date() - start;
        // status code response level handling
        if (res.statusCode && options.level === "auto") {
          level = levels.INFO;
          if (res.statusCode >= 300) level = levels.WARN;
          if (res.statusCode >= 400) level = levels.ERROR;
        }
        level = matchRules(res.statusCode, level, options.statusRules);

        const combinedTokens = assembleTokens(req, res, options.tokens || []);

        if (options.context) thisLogger.addContext("res", res);
        if (typeof fmt === "function") {
          const line = fmt(req, res, str => format(str, combinedTokens));
          if (line) thisLogger.log(level, line);
        } else {
          thisLogger.log(level, format(fmt, combinedTokens));
        }
        if (options.context) thisLogger.removeContext("res");
      });
    }

    // ensure next gets always called
    return next();
  };
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const path = __importStar(__webpack_require__(8));
const util_1 = __webpack_require__(120);
class Contract {
    constructor(absoulePath, code) {
        this.absolutePath = this.formatContractPath(absoulePath);
        this.code = code;
        this.imports = new Array();
        this.packagePath = '';
        this.abi = '';
    }
    //     public getAllImportFromPackages() {
    //         const importsFromPackages = new Array<string>();
    //         this.imports.forEach(importElement => {
    //             if (!this.isImportLocal(importElement)) {
    //                 importsFromPackages.push(importElement);
    //             }
    //         });
    //         return importsFromPackages;
    //     }
    isImportLocal(importPath) {
        return importPath.startsWith('.');
    }
    formatContractPath(contractPath) {
        return util_1.formatPath(contractPath);
    }
    replaceDependencyPath(importPath, depImportAbsolutePath) {
        const importRegEx = /(^\s?import\s+[^'"]*['"])(.*)(['"]\s*)/gm;
        this.code = this.code.replace(importRegEx, (match, p1, p2, p3) => {
            if (p2 === importPath) {
                return p1 + depImportAbsolutePath + p3;
            }
            else {
                return match;
            }
        });
    }
    resolveImports() {
        const importRegEx = /^\s?import\s+[^'"]*['"](.*)['"]\s*/gm;
        let foundImport = importRegEx.exec(this.code);
        while (foundImport != null) {
            const importPath = foundImport[1];
            if (this.isImportLocal(importPath)) {
                const importFullPath = this.formatContractPath(path.resolve(path.dirname(this.absolutePath), foundImport[1]));
                this.imports.push(importFullPath);
            }
            else {
                this.imports.push(importPath);
            }
            foundImport = importRegEx.exec(this.code);
        }
    }
}
exports.Contract = Contract;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPath = void 0;
function formatPath(contractPath) {
    return contractPath.replace(/\\/g, '/');
}
exports.formatPath = formatPath;


/***/ })
/******/ ])));