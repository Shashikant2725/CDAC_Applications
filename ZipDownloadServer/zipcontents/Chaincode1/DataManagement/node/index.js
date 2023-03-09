/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const DataChaincode = require('./lib/datachaincode');

module.exports.DataChaincode = DataChaincode;
module.exports.contracts = [ DataChaincode ];
