//
//  UIViewControllerExtension.swift
//  issue-tracker
//
//  Created by Song on 2021/06/09.
//

import UIKit

extension UIViewController {
    static func create() -> UIViewController {
        return self.init()
    }
}

extension UIViewController {
    func hideKeyboardWhenTappedAround() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(UIViewController.dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
}
