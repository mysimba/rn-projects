//
//  CalculatorModuleBridge.m
//  Calculator
//
//  Created by Myungbo Shim on 3/25/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalculatorModule, NSObject)

RCT_EXTERN_METHOD(executeCalc: (NSString *) action
                  numberA:(NSInteger) numberA
                  numberB:(NSInteger) numberB
                  resolver:(RCTPromiseResolveBlock) resolver
                  rejector:(RCTPromiseRejectBlock) rejecter)
@end
