//
//  OrderedTextFieldDelgate.swift
//  issue-tracker
//
//  Created by Song on 2021/06/25.
//

import UIKit

final class OrderedTextFieldDelgate: NSObject, UITextFieldDelegate {
    
    private var nextTextField: UITextField
    
    init(nextTextField: UITextField) {
        self.nextTextField = nextTextField
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        nextTextField.becomeFirstResponder()
        return true
    }
}
