//
//  ViewController.swift
//  compare-dev
//
//  Created by 于舒洋 on 5/16/17.
//  Copyright © 2017 Compare. All rights reserved.
//

import UIKit

class ViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "logout", style: .plain, target: self, action: #selector(handleLogout))
    }
    
    func handleLogout(){
        let loginController = LoginController()
        present(loginController, animated: true, completion: nil)
    }

    
}

