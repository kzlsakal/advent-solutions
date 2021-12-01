defmodule Utils do
  def load_input(file) do
    {file_name, folder} = file |> String.split("/") |> List.pop_at(-1)
    challenge = file_name |> String.split(".") |> List.first()

    folder
    |> Enum.join("/")
    |> Path.join("inputs/#{challenge}.txt")
    |> File.read!()
    |> String.split("\n")
  end
end
