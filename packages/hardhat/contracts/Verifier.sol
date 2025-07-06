// SPDX-License-Identifier: MIT
// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

pragma solidity ^0.8.0;

library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    /// @return the generator of G1
    function P1() pure internal returns (G1Point memory) {
        return G1Point(1, 2);
    }
    /// @return the generator of G2
    function P2() pure internal returns (G2Point memory) {
        return G2Point(
            [10857046999023057135944570762232829481370756359578518086990519993285655852781,
             11559732032986387107991004021392285783925812861821192530917403151452391805634],
            [8495653923123431417604973247489272438418190587263600148770280649306958101930,
             4082367875863433681332203403145435568316851327593401208105741076214120093531]
        );
    }
    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point memory p) pure internal returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }
    /// @return r the sum of two points of G1
    function addition(G1Point memory p1, G1Point memory p2) internal view returns (G1Point memory r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
    }

    /// @return r the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point memory p, uint s) internal view returns (G1Point memory r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success);
    }
    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] memory p1, G2Point[] memory p2) internal view returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++)
        {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[1];
            input[i * 6 + 3] = p2[i].X[0];
            input[i * 6 + 4] = p2[i].Y[1];
            input[i * 6 + 5] = p2[i].Y[0];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
        return out[0] != 0;
    }
    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(G1Point memory a1, G2Point memory a2, G1Point memory b1, G2Point memory b2) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2,
            G1Point memory d1, G2Point memory d2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}

/**
 * @title Verifier
 * @notice ZK-SNARK verifier contract for weather insurance proofs
 * @dev This contract verifies zero-knowledge proofs for weather data and maintains verification statistics
 */
contract Verifier {
    using Pairing for *;
    
    // State variables for tracking verification statistics
    uint256 public totalVerifications;
    uint256 public successfulVerifications;
    mapping(address => uint256) public userVerifications;
    mapping(address => uint256) public userSuccessfulVerifications;
    
    // Events for logging verification results
    event VerificationResult(address indexed user, bool success, uint256 timestamp);
    
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }
    
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x1678fa7b085231748882a55d733142122a721ea6ec6c6a94070b8212ebe06a99), uint256(0x20561cb36370d8c4282ec11930026beadb186ce15a3d0d4d0c9a3ac9cc573984));
        vk.beta = Pairing.G2Point([uint256(0x1b4f06a02c9837bc9d778028c697c1924f0d385408013d152537d67a6a3d5618), uint256(0x122801438bc82ec3d1f5ebc9423044d49893c1accffc9a40f386fbd775b49b19)], [uint256(0x09854d25447a9aafc4edca09769288cfb419c63d875ad4c6b5f253f1e56a53a0), uint256(0x2d5b4f27bf72b909f4f508407f9792171c42ff7b9fe539dada5c13ec8f2f1813)]);
        vk.gamma = Pairing.G2Point([uint256(0x23051bdc6e14ac07365384e240ae3ee66beb3ccaf388e6a140a3ab0c904155e2), uint256(0x08d1c8a326b4a0a305cbb9699f39d0e54e136619d3c7a701f458a821d1853b38)], [uint256(0x12ffb907f380ae8edd87e9145d6642d5b3af5cad367f5afc084232adec0d9d8e), uint256(0x2d0871fd0092e90cbd11e4ed92a45d3adbffb34834b617ccbdbad69cfe777298)]);
        vk.delta = Pairing.G2Point([uint256(0x237d4bce807566463ae21438f5e4642e914eb3b4697c4ba4d1f26d204de2b914), uint256(0x048acfcb60c1ec6c6038cddd20402666784507d2bdce1c834df3c1e19ab7d3ae)], [uint256(0x07168b0b959d1f9c62e78be2e316b70ba3bdc53466225f0b3edfa09c3c131b28), uint256(0x014bb91c0d8c118b351df2279d5a2a8d6deadfd061624886225d4e1ba1162159)]);
        vk.gamma_abc = new Pairing.G1Point[](3);
        vk.gamma_abc[0] = Pairing.G1Point(uint256(0x02b617d57ec690c65b059460f5572ffca651a547978ea67540f373c980026d39), uint256(0x094d18d3e519bbc9447a9ceb23558ce5bd11fed16c5aa8dbf1d169c3f3ab9a96));
        vk.gamma_abc[1] = Pairing.G1Point(uint256(0x2c96125a772b6f1edaa4830889bb3749d7d863545c360c0e989352d26f0a38eb), uint256(0x1c883e5cf271aea60f52a70559d2b80201c2a98aa0042f6d55c2b3e5dedee7fb));
        vk.gamma_abc[2] = Pairing.G1Point(uint256(0x0318843f4d13dc0d59eae43c5e63ff8a4cfff5ddfc83ceadef4495b5cb146256), uint256(0x08566e7e735a8f9e69d1a72d4940ea46917baba1abd7162faca278090a16cd9a));
    }
    
    function verify(uint[] memory input, Proof memory proof) internal view returns (uint) {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(vk_x, Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i]));
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if(!Pairing.pairingProd4(
             proof.a, proof.b,
             Pairing.negate(vk_x), vk.gamma,
             Pairing.negate(proof.c), vk.delta,
             Pairing.negate(vk.alpha), vk.beta)) return 1;
        return 0;
    }
    
    /**
     * @notice Verify a ZK-SNARK proof and update statistics
     * @param proof The ZK-SNARK proof to verify
     * @param input The public inputs for the proof
     * @return r True if the proof is valid, false otherwise
     */
    function verifyTx(Proof memory proof, uint[2] memory input) public returns (bool r) {
        uint[] memory inputValues = new uint[](2);
        
        for(uint i = 0; i < input.length; i++){
            inputValues[i] = input[i];
        }
        
        // Perform verification
        bool isValid = verify(inputValues, proof) == 0;
        
        // Update statistics
        totalVerifications++;
        userVerifications[msg.sender]++;
        
        if (isValid) {
            successfulVerifications++;
            userSuccessfulVerifications[msg.sender]++;
        }
        
        // Emit event
        emit VerificationResult(msg.sender, isValid, block.timestamp);
        
        return isValid;
    }
    
    /**
     * @notice Get global verification statistics
     * @return total Total number of verifications
     * @return successful Number of successful verifications
     * @return successRate Success rate as percentage (scaled by 100)
     */
    function getVerificationStats() public view returns (uint256 total, uint256 successful, uint256 successRate) {
        total = totalVerifications;
        successful = successfulVerifications;
        successRate = total > 0 ? (successful * 10000) / total : 0; // Scaled by 100 for percentage
    }
    
    /**
     * @notice Get verification statistics for a specific user
     * @param user The user address to query
     * @return total Total number of verifications by the user
     * @return successful Number of successful verifications by the user
     * @return successRate Success rate as percentage (scaled by 100)
     */
    function getUserStats(address user) public view returns (uint256 total, uint256 successful, uint256 successRate) {
        total = userVerifications[user];
        successful = userSuccessfulVerifications[user];
        successRate = total > 0 ? (successful * 10000) / total : 0; // Scaled by 100 for percentage
    }
}
