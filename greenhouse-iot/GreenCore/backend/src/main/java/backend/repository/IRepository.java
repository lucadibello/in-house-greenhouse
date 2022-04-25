package backend.repository;

import backend.exception.ProxyRequestFailException;
import backend.exception.RepositoryLoadException;

public interface IRepository {
    void load() throws RepositoryLoadException;
}
