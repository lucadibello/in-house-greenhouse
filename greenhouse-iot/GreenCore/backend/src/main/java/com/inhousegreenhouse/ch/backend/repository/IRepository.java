package com.inhousegreenhouse.ch.backend.repository;

import com.inhousegreenhouse.ch.backend.exception.RepositoryLoadException;

/**
 * Common interface for all repositories.
 */
public interface IRepository {
    /**
     * Loads the repository from the given path.
     * @throws RepositoryLoadException if the repository could not be loaded.
     */
    void load() throws RepositoryLoadException;
}
