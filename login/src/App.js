import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <ProtectedRoute path="/profile" component={ProfilePage} />
            </Switch>
        </Router>
    );
};

export default App;

// Esse é um exemplo básico e pode ser aprimorado de várias
//  maneiras, como adicionando mensagens de erro mais detalhadas,
//   melhorando o gerenciamento de estado com Redux ou Context 
//   API, e implementando autenticação baseada em tokens JWT para
//    maior segurança. Se precisar de mais ajuda ou ajustes 
//    específicos, estou à disposição!





