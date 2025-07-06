# Product Requirements Document (PRD): ZK Weather Insurance Platform

## 1. Introduction / Overview

The ZK Weather Insurance Platform is a decentralized application (dApp) that enables secure, privacy-preserving verification of weather radar data for agricultural insurance purposes. The platform leverages zero-knowledge machine learning (zkML) to allow users to submit weather radar data, generate cryptographic proofs of rainfall assessments, and verify these proofs on the Zircuit blockchain network.

The system addresses the critical need for transparent, tamper-proof weather data verification in agricultural insurance, enabling farmers and insurers to settle claims based on verified meteorological evidence without revealing sensitive location or operational data.

## 2. Goals

- **Primary Goal**: Create a complete ZK-SNARK workflow for weather data verification on Zircuit network
- **Secondary Goal**: Provide an intuitive interface for developers and technical users to test ZK proof generation and verification
- **Tertiary Goal**: Demonstrate practical application of zkML for agricultural insurance use cases
- **Performance Goal**: Achieve proof generation and verification within acceptable time limits for practical use
- **Usability Goal**: Enable non-cryptography experts to interact with the ZK proof system through a user-friendly interface

## 3. User Stories

### Primary User Stories
- **As a developer**, I want to upload radar data features and generate ZK proofs so that I can test the zkML model verification process
- **As a technical user**, I want to submit pre-generated proofs to the smart contract so that I can verify the on-chain verification functionality
- **As an insurance assessor**, I want to verify weather data claims through blockchain proofs so that I can process insurance claims with cryptographic certainty
- **As a farmer**, I want to submit weather data for my location so that I can prove rainfall events for insurance purposes without revealing my exact location

### Secondary User Stories
- **As a system administrator**, I want to monitor proof generation and verification statistics so that I can ensure system reliability
- **As a researcher**, I want to analyze the performance metrics of ZK proof generation so that I can optimize the system

## 4. Functional Requirements

1. **Radar Data Input Interface**
   - Provide input fields for all 113 radar features as specified in `bst1_feature_names.txt`
   - Support both manual input and file upload (CSV/JSON format)
   - Validate input data format and ranges
   - Display feature names with tooltips explaining each radar measurement

2. **ZK Proof Generation**
   - Integrate ZoKrates compilation and proof generation workflow
   - Support client-side or server-side proof generation
   - Display proof generation progress and timing metrics
   - Export generated proofs in JSON format compatible with the Verifier contract

3. **Smart Contract Integration**
   - Deploy Verifier contract to Zircuit network
   - Implement `verifyTx` function calls using Scaffold-ETH hooks
   - Display transaction status and gas usage
   - Show verification results (true/false) with transaction hash

4. **User Interface Components**
   - Modern, responsive design compatible with mobile and desktop
   - Real-time form validation and error handling
   - Progress indicators for proof generation and verification
   - Transaction history and status dashboard

5. **Data Management**
   - Store proof metadata (timestamp, submitter address, verification result)
   - Support proof export/import functionality
   - Maintain verification history for user sessions

## 5. Hedera & AI Integration Plan

### Hedera Network Services
This project uses **Zircuit blockchain network** instead of Hedera, so this section is adapted for Zircuit:

- **Smart Contracts (EVM)**: Deploy the Verifier contract on Zircuit network for ZK proof verification
- **Network Configuration**: Configure Scaffold-ETH to connect to Zircuit RPC endpoints
- **Transaction Processing**: Handle proof verification transactions on Zircuit network

### AI / ML Components
- **zkML Model**: The core AI component is a rainfall assessment model trained on weather radar data
- **ZoKrates Framework**: Used for generating zero-knowledge proofs of ML model execution
- **Proof System**: Implements Groth16 zk-SNARKs for efficient proof generation and verification
- **Model Integration**: The ML model is compiled to ZoKrates circuit format for proof generation

### Bridges / Oracles (Optional)
- **Not applicable for initial implementation**
- **Future consideration**: Chainlink oracles for real-time weather data feeds

### SDK / Tooling
- **Primary SDK**: TypeScript/JavaScript with ethers.js for blockchain interactions
- **ZK Tooling**: ZoKrates CLI for proof generation and circuit compilation
- **Frontend Framework**: Next.js with React for user interface
- **Smart Contract Tools**: Hardhat for contract deployment and testing

## 6. Non-Goals (Out of Scope)

1. **Real-time Weather Data Integration**: The system will not automatically fetch live weather data from external APIs
2. **User Authentication/Authorization**: No user account management or access control beyond wallet connection
3. **Advanced Data Storage**: No persistent database or complex data warehousing
4. **Multi-chain Support**: Focus only on Zircuit network deployment
5. **Production-ready Insurance Logic**: No actual insurance policy management or claim processing
6. **Mobile App Development**: Web-based interface only, no native mobile applications
7. **Automated Proof Generation**: Users must manually trigger proof generation process

## 7. Design Considerations

### UI/UX Design
- **Modern Interface**: Clean, minimalist design with clear visual hierarchy
- **Responsive Layout**: Mobile-first design approach with desktop optimization
- **Color Scheme**: Professional blue and green palette suggesting trust and nature
- **Typography**: Clear, readable fonts with appropriate sizing for technical content
- **Interactive Elements**: Hover effects, loading animations, and progress indicators

### Form Design
- **Organized Layout**: Group related radar features into logical sections
- **Input Validation**: Real-time validation with clear error messages
- **Data Visualization**: Charts or graphs showing input data patterns
- **Accessibility**: WCAG 2.1 AA compliance for screen readers and keyboard navigation

## 8. Technical Considerations

### Performance
- **Proof Generation**: Client-side generation may take 30-60 seconds depending on hardware
- **Browser Compatibility**: Modern browsers supporting WebAssembly for ZoKrates
- **Network Latency**: Zircuit network transaction confirmation times
- **File Upload**: Support for large CSV files (up to 10MB)

### Security
- **Input Validation**: Sanitize all user inputs to prevent injection attacks
- **Proof Verification**: Validate proof format before blockchain submission
- **Private Key Management**: Use secure wallet integration (MetaMask, WalletConnect)
- **HTTPS**: Ensure all communications use secure protocols

### Dependencies
- **ZoKrates**: Latest stable version for proof generation
- **Scaffold-ETH 2**: Current version with Zircuit network support
- **viem/chains**: Updated to include Zircuit network configuration
- **React**: v18+ for modern React features

## 9. Acceptance Criteria & Hackathon Deliverables

### Smart Contract Deployment
- [ ] Verifier contract successfully deployed on Zircuit network
- [ ] Contract address verified and viewable on Zircuit block explorer
- [ ] All contract functions (`verifyTx`) working correctly

### Source Code & Documentation
- [ ] Complete source code available in public GitHub repository
- [ ] README.md with clear setup and usage instructions
- [ ] Code comments explaining ZK proof integration
- [ ] Deployment scripts and configuration files

### Demo Video & Functionality
- [ ] Demo video (≤ 5 minutes) showing complete workflow:
  - Data input and validation
  - Proof generation process
  - On-chain verification
  - Results display
- [ ] All functional requirements implemented and testable
- [ ] Automated tests for smart contract functions
- [ ] Frontend integration tests for user workflows

### User Experience
- [ ] Intuitive interface allowing non-experts to use the system
- [ ] Clear error messages and user guidance
- [ ] Responsive design working on mobile and desktop
- [ ] Fast loading times and smooth interactions

## 10. Success Metrics

### Technical Metrics
- **Proof Generation Time**: < 2 minutes for standard input data
- **Verification Success Rate**: > 99% for valid proofs
- **Transaction Confirmation Time**: < 30 seconds on Zircuit network
- **Frontend Load Time**: < 3 seconds for initial page load

### User Experience Metrics
- **User Completion Rate**: > 80% of users complete full proof generation workflow
- **Error Rate**: < 5% of proof generation attempts fail due to user input errors
- **User Satisfaction**: Positive feedback on interface usability

### Business Metrics
- **Demonstration Success**: Successfully showcase zkML application for insurance
- **Developer Adoption**: Other developers can set up and run the system
- **Educational Value**: Clear understanding of ZK proof benefits for data privacy

## 11. Optional / Stretch Goals

### Enhanced Features
- **Batch Proof Generation**: Process multiple datasets simultaneously
- **Proof Comparison**: Compare multiple proofs for consistency analysis
- **Historical Data Analysis**: Visualize verification trends over time
- **Export Functionality**: Download verification reports as PDF

### Advanced Integrations
- **Multiple ZK Proof Systems**: Support for different proof types (STARK, Plonk)
- **Cross-chain Verification**: Verify proofs on multiple blockchain networks
- **Oracle Integration**: Real-time weather data feeds from Chainlink or similar
- **IPFS Storage**: Decentralized storage for proof metadata

### Developer Tools
- **API Documentation**: REST API for programmatic access
- **SDK Development**: JavaScript/Python SDKs for integration
- **Testing Framework**: Comprehensive test suite for ZK circuits
- **Performance Monitoring**: Real-time metrics dashboard

## 12. Open Questions

1. **ZoKrates Integration**: Should proof generation run client-side (WebAssembly) or server-side for better performance?
2. **Data Validation**: What are the acceptable ranges for each of the 113 radar features?
3. **Error Handling**: How should the system handle partial proof generation failures?
4. **Scalability**: What's the maximum number of concurrent users the system should support?
5. **Cost Optimization**: How can we minimize gas costs for proof verification on Zircuit?
6. **User Onboarding**: Should we provide sample data sets for testing purposes?
7. **Circuit Optimization**: Are there opportunities to optimize the ZoKrates circuit for better performance?

---

**Document Version**: 1.0  
**Last Updated**: July 6, 2025  
**Next Review**: Upon development milestone completion
